import { AuthActions, authState } from './auth.state';
import { api } from '@/core';
import { FormState } from '@/forms';
import { store } from '@/state';
import { computed, reactive, ref } from 'vue';
import jwt_decode from 'jwt-decode';
import { AUTH_TOKEN_KEY } from './auth.config';

export const useLoginForm = () => {
    const form = ref<InstanceType<typeof HTMLFormElement> | null>(null);
    const state: FormState = reactive({
        errors: null,
        wasValidated: false,
        data: {
            username: '',
            password: ''
        }
    });

    const submit = () => {
        if (!form.value?.checkValidity()) {
            // Show errors
            state.wasValidated = true;
            return;
        }

        api.post('/auth/login', state.data).subscribe({ 
            next(response) {
                // Success
                store.dispatch({ type: AuthActions.LOGIN_SUCCESS });

                // Reset form
                state.errors = null;
                state.data.email = '';
                state.data.password = '';

                authState.user = jwt_decode(response.accessToken);
                localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken);
            },

            error(error) {
                if(error.response.data.errors) {
                    state.errors = error.response.data.errors
                } else {
                    state.errors = {
                        remoteError: error.response.data
                    };
                }
            }
        });
    }

    const hasErrors = computed(() => state.errors ? Object.keys(state.errors).length > 0 : false);

    return {
        form, 
        state,
        submit,
        hasErrors
    }
}
