import { AbstractDocument } from './schema';
import { api } from './api';

export class Resource<T extends AbstractDocument> {
    constructor(
        protected resourceUrl: string
    ) { }

    async find(): Promise<T[]> {
        const response = await api.get(this.resourceUrl);
        return response.data as T[];
    }

    async findOne(id: string): Promise<T> {
        const response = await api.get(this.resourceUrl + "/" + id);
        return response.data as T;
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await api.post(this.resourceUrl, data);
        return response.data as T;
    }

    async update(data: Partial<T>): Promise<T> {
        const response = await api.patch(this.resourceUrl + "/" + data._id, data);
        return response.data as T;
    }

    async save(data: Partial<T>): Promise<T> {
        return data._id ? this.update(data) : this.create(data);
    }
}

export const createResource = <T>(resourceUrl: string): Resource<T> => {
    return new Resource<T>(resourceUrl);
}
