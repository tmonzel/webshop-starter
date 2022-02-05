import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

const http = axios.create();
const API_URL = 'http://localhost:3000';

const get = (path: string, config?: AxiosRequestConfig) => {
    return new Observable(observer => {
        http.get(API_URL + path, config).then(response => {
            observer.next(response.data);
            observer.complete();
        }).catch(error => {
            observer.error(error);
        });
    });
}

const post = () => {

}

export const api = {
    get,
    post
}
