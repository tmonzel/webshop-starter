import { AxiosRequestConfig } from 'axios';
import { http } from './http';

const API_URL = 'http://localhost:3000';

const get = (path: string, config?: AxiosRequestConfig) => {
    return http.get(API_URL + path, config);
}

const post = (path: string, data: any, config?: AxiosRequestConfig) => {
    return http.post(API_URL + path, data, config);
}

export const api = {
    get,
    post
}
