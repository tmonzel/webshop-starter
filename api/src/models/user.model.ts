import { model, Schema, Document, Model } from 'mongoose';

export interface User extends Document {
    email: string;
    username: string;
    password: string;
}

const schema = new Schema<User>({
    email: { 
        type: String, 
        required: true, 
        validate: {
            type: 'existsAlready',
            validator: async function(email) {
                const user = await UserModel.findOne({ email });
                return user ? false : true;
            },
            message: () => 'Ihre E-Mail Adresse existiert bereits. Wählen Sie eine andere'
        }, 
    },
    username: { type: String, required: true },
    password: { type: String }
})

export const UserModel: Model<User> = model<User>("User", schema);
