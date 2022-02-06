import { Subject } from 'rxjs';

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