import { User, api } from '@/core';
import { store } from '@/state';
import { computed, reactive } from 'vue';
import jwt_decode from "jwt-decode";

export enum UserActions {
    REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
    LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
    LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
}

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export interface AuthState {
    user: User | null;
}

export interface FormState {
    errors: any;
    data: any;
}

const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

const authState = reactive<AuthState>({
    user: authToken ? jwt_decode(authToken) as User : null
});

export const useAuth = () => {
    const logout = () => {
        authState.user = null;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        store.dispatch({ type: UserActions.LOGOUT_SUCCESS });
    }

    return {
        state: authState,
        logout
    }
}

export const useSignupForm = () => {
    const form = reactive<FormState>({
        errors: null,
        data: {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
    });

    const submit = (user: Partial<User>) => {
        api.post('/auth/signup', user).subscribe({ 
            next() {
                // Success
                store.dispatch({ type: UserActions.REGISTER_SUCCESS });

                // Reset form
                form.errors = null;
                form.data.email = '';
                form.data.username = '';
                form.data.password = '';
            },

            error(error) {
                form.errors = error.response.data.errors;
            }
        });
    }

    return {
        form, 
        submit
    }
}

export const useLoginForm = () => {
    const form = reactive<FormState>({
        errors: null,
        data: {
            email: '',
            password: ''
        }
    });

    const submit = (email: string, password: string) => {
        api.post('/auth/login', { email, password }).subscribe({ 
            next(response) {
                // Success
                store.dispatch({ type: UserActions.LOGIN_SUCCESS });

                // Reset form
                form.errors = null;
                form.data.email = '';
                form.data.password = '';

                authState.user = jwt_decode(response.accessToken);
                localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken);
            },

            error(error) {
                if(error.response.data.errors) {
                    form.errors = error.response.data.errors
                } else {
                    form.errors = {
                        remoteError: error.response.data
                    };
                }
            }
        });
    }

    const hasErrors = computed(() => form.errors ? Object.keys(form.errors).length > 0 : false);

    return {
        form, 
        submit,
        hasErrors
    }
}
