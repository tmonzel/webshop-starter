import { map, Observable } from 'rxjs';
import { api } from './api';

export class ResourceService<T> {
    constructor(
        protected resourceUrl: string
    ) { }

    find(): Observable<T[]> {
        return api.get(this.resourceUrl).pipe(
            map(data => data as T[])
        );
    }

    findOne(id: string): Observable<T> {
        return api.get(this.resourceUrl + "/" + id).pipe(
            map(data => data as T)
        );
    }

    save(data: any): Observable<T> {
        return api.patch(this.resourceUrl + "/" + data._id, data).pipe(
            map(data => data as T)
        );
    }
}
