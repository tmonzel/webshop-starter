import { AbstractDocument } from './schema';
import { api } from './api';

export interface ResourceSerializer<T> {
    serialize(item: Partial<T>): any;
    deserialize(data: any): T;
}

export class Resource<T extends AbstractDocument> {
    protected serializer: ResourceSerializer<T>;

    constructor(
        protected resourceUrl: string,
        serializer?: ResourceSerializer<T>
    ) { 
        this.serializer = serializer || {
            serialize(item: T) { 
                return item 
            },

            deserialize(data: any): T {
                return data;
            }
        }
    }

    async find(): Promise<T[]> {
        const response = await api.get(this.resourceUrl);
        return (response.data as Array<any>).map(item => this.serializer.deserialize(item)) as T[];
    }

    async findOne(id: string): Promise<T> {
        const response = await api.get(this.resourceUrl + "/" + id);
        return this.serializer.deserialize(response.data) as T;
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await api.post(this.resourceUrl, this.serializer.serialize(data));
        return response.data as T;
    }

    async update(data: Partial<T>): Promise<T> {
        const response = await api.patch(this.resourceUrl + "/" + data._id, this.serializer.serialize(data));
        return response.data as T;
    }

    async save(data: Partial<T>): Promise<T> {
        return data._id ? this.update(data) : this.create(data);
    }
}

export const createResource = <T>(resourceUrl: string, serializer?: ResourceSerializer<T>): Resource<T> => {
    return new Resource<T>(resourceUrl, serializer);
}
