import { api, http, User } from '@/core';
import { store } from '@/state';
import { map, Observable } from 'rxjs';
import { AuthActions, AuthState } from './auth.state';
import jwt_decode from 'jwt-decode';
import { AuthConfig } from './auth.config';
import { reactive } from 'vue';

export const createAuth = (config: AuthConfig) => {
    const authToken = localStorage.getItem(config.tokenKey);

    const state = reactive<AuthState>({
        user: authToken ? jwt_decode(authToken) as User : null
    });

    const logout = () => {
        state.user = null;
        localStorage.removeItem(config.tokenKey);
        store.dispatch({ type: AuthActions.LOGOUT_SUCCESS });
    }

    const login = (username: string, password: string): Observable<User> => {
        return api.post('/auth/login', { username, password }).pipe(map(response => {
            state.user = jwt_decode(response.accessToken);
            localStorage.setItem(config.tokenKey, response.accessToken);
            // Success
            store.dispatch({ type: AuthActions.LOGIN_SUCCESS });

            // TODO: Check if role accepted, otherwise throw error

            return state.user as User;
        }))
    }

    http.interceptRequest(request => {
        const token = localStorage.getItem(config.tokenKey);
    
        if(token && request.headers) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        
        return request;
    });

    return {
        logout,
        login,
        state
    }
}
