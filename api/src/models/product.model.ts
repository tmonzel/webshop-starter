import { model, Schema, Document } from 'mongoose';

export interface Product extends Document {
    name: string;
    type: string;
}

const schema = new Schema<Product>({
    name: { type: String, required: true },
    type: { type: String }
})

export const ProductModel = model<Product>('Product', schema);
