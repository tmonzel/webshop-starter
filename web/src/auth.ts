import { User, http } from './core';

export enum AuthActions {
    LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
}

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export interface AuthState {
    user: User | null;
}

http.interceptRequest(request => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if(token && request.headers) {
        request.headers['Authorization'] = 'Bearer ' + token;
    }
    
    return request;
});
