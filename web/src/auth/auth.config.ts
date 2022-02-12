import { http } from '@/core';

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export const registerAuth = () => {
    http.interceptRequest(request => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
        if(token && request.headers) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        
        return request;
    });
}