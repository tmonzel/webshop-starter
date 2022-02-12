import { api } from '@/core';
import { FormState } from '@/forms';
import { store } from '@/state';
import { reactive, ref } from 'vue';

export const useSignupForm = () => {
    const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
    const state: FormState = reactive({
        errors: null,
        wasValidated: false,
        data: {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
    });

    const submit = () => {
        if (!form.value?.checkValidity()) {
            // Show errors
            state.wasValidated = true;
            return;
        }

        api.post('/auth/signup', state.data).subscribe({ 
            next() {
                // Success
                store.dispatch({ type: 'REGISTER_SUCCESS' });

                // Reset form
                state.errors = null;
                state.data.email = '';
                state.data.username = '';
                state.data.password = '';
                state.data.passwordConfirm = '';
            },

            error(error) {
                state.errors = error.response.data.errors;
            }
        });
    }

    return {
        form,
        state, 
        submit
    }
}
