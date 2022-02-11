import { UserActions } from './features/auth';
import { CartActions } from './features/cart';
import { router } from './routings';
import { store } from '@/state';

store.actions$.subscribe(action => {
    switch(action.type) {
        case UserActions.REGISTER_SUCCESS:
            router.push('/login');
            break;
        case UserActions.LOGIN_SUCCESS:
            router.push('/');
            break;
        case UserActions.LOGOUT_SUCCESS:
            router.push('/login');
            break;
        case CartActions.ADD_ITEM:
            router.push('/cart');
            break;
    }
})