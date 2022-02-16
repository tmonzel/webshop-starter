import { model, Schema, Document, Model } from 'mongoose';
import { User } from './user.model';

export interface Order extends Document {
    items: any[];
    user: User;
    createdAt: Date;
}

const schema = new Schema<Order>({
    items: [{ 
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        config: Schema.Types.Mixed
    }],

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: { type: Date, default: Date.now },
})

export const OrderModel: Model<Order> = model<Order>('Order', schema);
