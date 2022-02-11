import { AuthActions, AuthState, AUTH_TOKEN_KEY } from '@/auth';
import { computed, reactive } from 'vue';
import jwt_decode from "jwt-decode";
import { api, User } from '@/core';
import { store } from '@/state';
import { FormState } from '@/forms';

const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

export const authState = reactive<AuthState>({
    user: authToken ? jwt_decode(authToken) as User : null
});

export const useAuth = () => {
    const logout = () => {
        authState.user = null;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        store.dispatch({ type: AuthActions.LOGOUT_SUCCESS });
    }

    return {
        state: authState,
        logout
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
                store.dispatch({ type: AuthActions.LOGIN_SUCCESS });

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
