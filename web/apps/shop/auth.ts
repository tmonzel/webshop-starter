import { createAuth } from '@/auth';

export const auth = createAuth({
    tokenKey: '_SHOP_AUTH',
    allowedRoles: ['ROLE_CUSTOMER']
});
