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
            const user = jwt_decode(response.accessToken) as User;

            if(!rolesAllowed(user.roles)) {
                throw new Error("User is not allowed");
            } else {
                state.user = user;
                localStorage.setItem(config.tokenKey, response.accessToken);
                store.dispatch({ type: AuthActions.LOGIN_SUCCESS });
            }

            return state.user as User;
        }))
    }

    const rolesAllowed = (roles: string[]): boolean => {
        return config.allowedRoles.filter(role => roles.includes(role)).length > 0;
    }

    const isLoggedIn = (): boolean => {
        return state.user !== null;
    }

    const isAllowed = (): boolean => {
        return state.user !== null && rolesAllowed(state.user.roles);
    }

    http.interceptRequest(request => {
        const token = localStorage.getItem(config.tokenKey);
    
        if(token && request.headers) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        
        return request;
    });

    http.interceptResponse(response => {
        if(state.user && !rolesAllowed(state.user.roles)) {
            logout();
        }

        return response;
    });

    return {
        logout,
        login,
        state,
        isLoggedIn,
        isAllowed,
    }
}
