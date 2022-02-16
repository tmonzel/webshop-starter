import { model, Schema, Document, Model } from 'mongoose';

export enum UserRoles  {
    ADMIN = 'ROLE_ADMIN',
    CUSTOMER = 'ROLE_CUSTOMER'
}

export interface User extends Document {
    username: string;
    password: string;
    roles: UserRoles[];
}

const schema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String },
    roles: []
})

export const UserModel: Model<User> = model<User>("User", schema);
