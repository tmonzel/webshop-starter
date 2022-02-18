import { AxiosRequestConfig } from 'axios';
import { http } from './http';

const API_URL = process.env.VUE_APP_API_URL;

const get = (path: string, config?: AxiosRequestConfig) => {
    return http.get(API_URL + path, config);
}

const post = (path: string, data: any, config?: AxiosRequestConfig) => {
    return http.post(API_URL + path, data, config);
}

const patch = (path: string, data: any, config?: AxiosRequestConfig) => {
    return http.patch(API_URL + path, data, config);
}

export const api = {
    get,
    post,
    patch
}
