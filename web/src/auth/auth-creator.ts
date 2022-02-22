import { api, http, User } from '@/core';
import { store } from '@/state';
import { map, Observable } from 'rxjs';
import { AuthActions, AuthState } from './auth.state';
import jwt_decode from 'jwt-decode';
import { AuthConfig } from './auth.config';
import { reactive } from 'vue';

export const createAuth = (config: AuthConfig) => {
    const state = reactive<AuthState>({
        user: null
    });

    const initialize = () => {
        if(gotValidToken() && !state.user) {
            loadUser();
        }
    }

    const logout = () => {
        state.user = null;
        localStorage.removeItem(config.tokenKey);
        store.dispatch({ type: AuthActions.LOGOUT_SUCCESS });
    }

    const login = (username: string, password: string): Observable<User> => {
        return api.post('/auth/login', { username, password }).pipe(map(response => {
            const payload = jwt_decode(response.accessToken) as { userRoles: string[] };

            if(!rolesAllowed(payload.userRoles)) {
                throw new Error("User is not allowed");
            } else {
                writeToken(response.accessToken);
                loadUser();
                store.dispatch({ type: AuthActions.LOGIN_SUCCESS });
            }

            return state.user as User;
        }))
    }

    const readToken = () => {
        return localStorage.getItem(config.tokenKey);
    }

    const writeToken = (token: string) => {
        localStorage.setItem(config.tokenKey, token);
    }

    const loadUser = () => {
        api.get('/auth/user').subscribe(user => {
            state.user = user;
        })
    }

    const gotValidToken = (): boolean => {
        return readToken() != null;
    }

    const rolesAllowed = (roles: string[]): boolean => {
        return config.allowedRoles.filter(role => roles.includes(role)).length > 0;
    }

    const isLoggedIn = (): boolean => {
        return gotValidToken();
    }

    const isAllowed = (): boolean => {
        const token = readToken();

        if(!token) {
            return false;
        }

        const payload = jwt_decode(token) as any;
        return rolesAllowed(payload.userRoles as string[]);
    }

    http.interceptRequest(request => {
        const token = readToken();
    
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
        loadUser,
        initialize
    }
}
