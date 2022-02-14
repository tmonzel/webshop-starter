import { AuthActions } from '@/auth';
import { router } from './routing';
import { store } from '@/state';

store.actions$.subscribe(action => {
    switch(action.type) {
        case AuthActions.LOGIN_SUCCESS:
            router.push('/');
            break;
        case AuthActions.LOGOUT_SUCCESS:
            router.push('/login');
            break;
    }
})
