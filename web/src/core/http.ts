/**
 * RxJs wrapper for axios 
 * 
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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

const post = (path: string, data: any, config?: AxiosRequestConfig): Observable<any> => {
    return new Observable(observer => {
        httpService.post(path, data, config).then(response => {
            observer.next(response.data);
            observer.complete();
        }).catch(error => {
            observer.error(error);
        });
    });
}

const patch = (path: string, data: any, config?: AxiosRequestConfig): Observable<any> => {
    return new Observable(observer => {
        httpService.patch(path, data, config).then(response => {
            observer.next(response.data);
            observer.complete();
        }).catch(error => {
            observer.error(error);
        });
    });
}

const interceptResponse = (onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined) => {
    httpService.interceptors.response.use(onFulfilled);
}

const interceptRequest = (onFulfilled?: ((value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>) | undefined) => {
    httpService.interceptors.request.use(onFulfilled);
}

export const http = {
    get,
    post,
    patch,
    interceptResponse,
    interceptRequest
}