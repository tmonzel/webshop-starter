import { Media } from '@/core';
import { MediaResource } from '@/resources';
import { createReactiveModel } from '@/state';

export const CustomerModel = createReactiveModel<Media>(MediaResource);

export const useCustomers = () => {
    return {
        ...CustomerModel
    }
}