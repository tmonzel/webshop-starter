import { Customer } from '@/core';
import { CustomerResource } from '@/resources';
import { createReactiveModel } from '@/state';

export const CustomerModel = createReactiveModel<Customer>(CustomerResource);

export const useCustomers = () => {
    return {
        ...CustomerModel
    }
}
