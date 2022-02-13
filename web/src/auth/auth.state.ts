import { User } from '@/core';

export interface AuthState {
    user: User | null;
}

export enum AuthActions {
    LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
}
