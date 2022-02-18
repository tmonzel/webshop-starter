import { Customer } from '@/core';
import { customerService } from '@/data';
import { createReactiveModel } from '@/state';

export const CustomerModel = createReactiveModel<Customer>(customerService);

export const useCustomers = () => {
    return {
        ...CustomerModel
    }
}
