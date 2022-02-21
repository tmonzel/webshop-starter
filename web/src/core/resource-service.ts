import { map, Observable } from 'rxjs';
import { AbstractDocument } from './schema';
import { api } from './api';

export class ResourceService<T extends AbstractDocument> {
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

    save(data: Partial<T>): Observable<T> {
        if(data._id) {
            // Update
            return api.patch(this.resourceUrl + "/" + data._id, data).pipe(
                map(result => data as T)
            );
        } else {
            // Create
            return api.post(this.resourceUrl, data).pipe(
                map(data => data as T)
            );
        }
    }
}
