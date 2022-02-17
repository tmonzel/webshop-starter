import { AuthActions } from '@/auth';
import { CartActions } from './features/cart';
import { router } from './routing';
import { store } from '@/state';

store.actions$.subscribe(action => {
    switch(action.type) {
        case 'REGISTER_SUCCESS':
            router.push('/login');
            break;
        case AuthActions.LOGIN_SUCCESS:
            router.push('/');
            break;
        case AuthActions.LOGOUT_SUCCESS:
            router.push('/login');
            break;
        case CartActions.ADD_ITEM:
            router.push('/cart');
            break;
    }
})