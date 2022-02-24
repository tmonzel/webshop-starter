import { http } from '@/core';
import { store } from '@/state';
import { AuthActions, AuthState } from './auth.state';
import jwt_decode from 'jwt-decode';
import { AuthConfig } from './auth.config';
import { reactive } from 'vue';
import { AuthResource } from './auth.resource';

export const createAuth = (config: AuthConfig) => {
    const state = reactive<AuthState>({
        user: null
    });

    const initialize = () => {
        http.interceptors.request.use(request => {
            const token = readToken();
        
            if(token && request.headers) {
                request.headers['Authorization'] = 'Bearer ' + token;
            }
            
            return request;
        });

        http.interceptors.response.use(response => {
            if(state.user && !rolesAllowed(state.user.roles)) {
                logout();
            }

            return response;
        }, (error) => {
            if(error.response.status === 403) {
                logout();
            }
        });

        if(gotValidToken() && !state.user) {
            loadUser();
        }
    }

    const logout = () => {
        state.user = null;
        removeToken();
        store.dispatch({ type: AuthActions.LOGOUT_SUCCESS });
    }

    const login = async (username: string, password: string): Promise<string | boolean> => {
        try {
            const accessToken = await AuthResource.login(username, password);
            const payload = jwt_decode(accessToken) as { userRoles: string[] };

            if(!rolesAllowed(payload.userRoles)) {
                throw new Error("User is not allowed");
            } else {
                writeToken(accessToken);
                loadUser();
                store.dispatch({ type: AuthActions.LOGIN_SUCCESS });
            }

            return accessToken;

        } catch(error) {
            return false;
        }
    }

    const readToken = () => {
        return localStorage.getItem(config.tokenKey);
    }

    const writeToken = (token: string) => {
        localStorage.setItem(config.tokenKey, token);
    }

    const removeToken = () => {
        localStorage.removeItem(config.tokenKey);
    }

    const loadUser = async () => {
        state.user = await AuthResource.getCurrentUser();
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
