import { Subject } from 'rxjs';
import { reactive } from 'vue';
import { AbstractDocument, ResourceService } from './core';

export interface Action {
    type: string;
}

const actionSubject = new Subject<Action>();

/**
 * Store acts just as an global action bus for now
 * 
 */
export class Store {
    readonly actions$ = actionSubject.asObservable();

    dispatch(action: Action) {
        actionSubject.next(action);
    }
}

export const store = new Store();

export interface ModelState<T> {
    items: T[];
    entities: { [id: string]: T };
    loadedItem: T | null;
    allLoaded: boolean;
    loadingState: string | null;
}

export interface ReactiveModel<T> {
    state: ModelState<T>;
    loadAll: () => void;
    loadAllIfNecessary: () => void;
    loadOne: (id: string) => void;
    loadOneIfNecessary: (id: string) => void;
    unloadItem: () => void;
    saveItem: (data: Partial<T>) => Promise<T>;
}

export const createReactiveModel = <T extends AbstractDocument>(model: ResourceService<T>, initialState?: ModelState<T>): ReactiveModel<T> => {
    const state = reactive(initialState ?? {
        items: [],
        entities: {},
        loadedItem: null,
        allLoaded: false,
        loadingState: null
    }) as ModelState<T>;

    const loadAll = async () => {
        const items = await model.find();
        state.items = items;

        const entities = {};
        for(const item of items) {
            if(item._id) entities[item._id] = item;
        }

        state.entities = entities;
        state.allLoaded = true;
    }

    const loadAllIfNecessary = () => {
        if(!state.allLoaded) {
            loadAll();
        }
    }

    const loadOne = async (id: string) => {
        const item = await model.findOne(id);
        state.entities[item._id as string] = item;
        state.loadedItem = item;
    }

    const loadOneIfNecessary = (id: string) => {
        if(state.entities[id]) {
            state.loadedItem = state.entities[id];
        } else {
            loadOne(id);
        }
    }

    const saveItem = async (data: Partial<T>) => {
        state.loadingState = 'saving';
        
        const item = await model.save(data);

        if(data._id && state.entities[data._id as string]) {
            const obj = state.entities[data._id as string];
            
            // Update our version
            for(const prop in Object.keys(data)) {
                obj[prop] = data[prop];
            }
        } else {
            state.entities[item._id as string] = item;
            state.items.push(item);
        }

        state.loadingState = null;

        return item;
    }

    const unloadItem = () => {
        state.loadedItem = null;
    }

    return {
        state,
        loadAll,
        loadAllIfNecessary,
        loadOne,
        loadOneIfNecessary,
        unloadItem,
        saveItem
    } as ReactiveModel<T>;
}
