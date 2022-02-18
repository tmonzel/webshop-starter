import { ResourceController } from '@/controller';
import { ProductModel } from '@/models/product.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export const productController: ResourceController = {
    resourceName: ProductModel.collection.name,

    index(request: Request, response: Response) {
        ProductModel.find().then(result => {
            response.json(result);
        });
    },

    pick(request: Request, response: Response) {
        ProductModel.findOne({ _id: new ObjectId(request.params.id) }).then(result => {
            response.json(result);
        });
    },

    update(request: Request, response: Response) {
        ProductModel.updateOne({ _id: new ObjectId(request.params.id) }, { $set: { ...request.body } }).then(result => {
            response.sendStatus(200);
        });
    },
}