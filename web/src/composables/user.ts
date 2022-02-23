import { User } from '@/core';
import { UserResource } from '@/resources';
import { createReactiveModel } from '@/state';

export const UserModel = createReactiveModel<User>(UserResource);

export const useUsers = () => {
    return {
        ...UserModel
    }
}
