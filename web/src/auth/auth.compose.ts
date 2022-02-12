import { store } from '@/state';
import { AUTH_TOKEN_KEY } from './auth.config';
import { AuthActions, authState } from './auth.state';

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
