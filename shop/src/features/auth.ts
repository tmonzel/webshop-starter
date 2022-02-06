import { User, api } from '@/core';
import { store } from '@/state';
import { reactive } from 'vue';

export enum UserActions {
    REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
    LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
}

export const useSignupForm = () => {
    const form = reactive({
        errors: {} as any,
        data: {
            email: '',
            username: '',
            password: ''
        }
    });

    const submit = (user: Partial<User>) => {
        api.post('/auth/signup', user).subscribe({ 
            next() {
                // Success
                store.dispatch({ type: UserActions.REGISTER_SUCCESS });

                // Reset form
                form.errors = {};
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
        form, submit
    }
}

export const useLoginForm = () => {
    const form = reactive({
        errors: {} as any,
        data: {
            email: '',
            password: ''
        }
    });

    const submit = (email: string, password: string) => {
        api.post('/auth/login', { email, password }).subscribe({ 
            next() {
                // Success
                store.dispatch({ type: UserActions.LOGIN_SUCCESS });

                // Reset form
                form.errors = {};
                form.data.email = '';
                form.data.password = '';
            },

            error(error) {
                form.errors = error.response.data.errors;
            }
        });
    }

    return {
        form, submit
    }
}
