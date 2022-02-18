import { User } from '@/core';
import { userService } from '@/data';
import { createReactiveModel } from '@/state';

export const UserModel = createReactiveModel<User>(userService);

export const useUsers = () => {
    return {
        ...UserModel
    }
}
