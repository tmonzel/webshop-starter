import { api, User } from '@/core';

export const AuthResource = {
    async login(username: string, password: string): Promise<string> {
        return api.post('/auth/login', { username, password }).then(response => response.data.accessToken);
    },

    async getCurrentUser(): Promise<User> {
        return api.get('/auth/user').then(response => response.data as User);
    }
}