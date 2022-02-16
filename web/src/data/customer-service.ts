import { ResourceService, Customer } from '@/core';

export const customerService = new class extends ResourceService<Customer> {
    constructor() {
        super('/customers');
    }
}
