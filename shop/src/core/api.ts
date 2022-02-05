import { AxiosRequestConfig } from 'axios';
import { http } from './http';

const API_URL = 'http://localhost:3000';

const get = (path: string, config?: AxiosRequestConfig) => {
    return http.get(API_URL + path, config);
}

const post = () => {

}

export const api = {
    get,
    post
}
