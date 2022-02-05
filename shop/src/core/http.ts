/**
 * RxJs wrapper for axios 
 * 
 */
import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

// Create axios and keep it internal for now
const httpService = axios.create();
 
const get = (path: string, config?: AxiosRequestConfig): Observable<any> => {
    return new Observable(observer => {
        httpService.get(path, config).then(response => {
            observer.next(response.data);
            observer.complete();
        }).catch(error => {
            observer.error(error);
        });
    });
}

export const http = {
    get
}