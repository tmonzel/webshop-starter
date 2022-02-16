import { ResourceService, User } from '@/core';

export const userService = new class extends ResourceService<User> {
    constructor() {
        super('/users');
    }
}
