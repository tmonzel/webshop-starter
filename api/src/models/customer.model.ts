import { Schema, Model } from 'mongoose';
import { User, UserModel } from './user.model';

export interface Customer extends User {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
}

const schema = new Schema<Customer>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
})

export const CustomerModel: Model<Customer> = UserModel.discriminator('Customer', schema);
