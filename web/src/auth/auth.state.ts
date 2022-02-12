import { User } from '@/core';
import { reactive } from 'vue';
import { AUTH_TOKEN_KEY } from './auth.config';
import jwt_decode from 'jwt-decode';

export interface AuthState {
    user: User | null;
}

export enum AuthActions {
    LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
}

const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

export const authState = reactive<AuthState>({
    user: authToken ? jwt_decode(authToken) as User : null
});