import { map, Observable } from 'rxjs';
import { api } from './api-services';

export abstract class ResourceService<Resource> {
    constructor(
        protected resourceUrl: string
    ) { }

    find(): Observable<Resource[]> {
        return api.get(this.resourceUrl).pipe(
            map(data => data as Resource[])
        );
    }

    findOne(id: string): Observable<Resource> {
        return api.get(this.resourceUrl + "/" + id).pipe(
            map(data => data as Resource)
        );
    }
}
