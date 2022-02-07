import { model, Schema } from 'mongoose';

export interface Product {
    name: string;
    type: string;
    description: string;
    imageUrl: string;
    price: { value: number; currency: string };
}

const schema = new Schema<Product>({
    name: { type: String, required: true },
    type: String,
    description: String,
    imageUrl: String,
    price: { value: Number, currency: String }
})

export const ProductModel = model<Product>('Product', schema);
