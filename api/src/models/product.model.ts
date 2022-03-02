import { model, Schema } from 'mongoose';

export interface Product {
    name: string;
    type: string;
    description: string;
    price: { value: number; currency: string };
    image?: Buffer;
}

const schema = new Schema<Product>({
    name: { type: String, required: true },
    type: String,
    description: String,
    price: { value: Number, currency: String },
    image: Buffer
})

export const ProductModel = model<Product>('Product', schema);
