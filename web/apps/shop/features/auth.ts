import { User, api } from '@/core';
import { FormState } from '@/forms';
import { store } from '@/state';
import { reactive } from 'vue';

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
                store.dispatch({ type: 'REGISTER_SUCCESS' });

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
