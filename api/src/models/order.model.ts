import { model, Schema, Document, Model } from 'mongoose';
import { User } from './user.model';

export interface Order extends Document {
    items: any[];
    user: User;
}

const ItemSchema = new Schema({ 
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    config: Schema.Types.Mixed
});

const schema = new Schema<Order>({
    items: [ItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const OrderModel: Model<Order> = model<Order>('Order', schema);
