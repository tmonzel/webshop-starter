import { createAuth } from '@/auth';

export const auth = createAuth({
    tokenKey: '_ADMIN_AUTH',
    allowedRoles: ['ROLE_ADMIN']
});
