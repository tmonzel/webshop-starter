import { Express } from 'express';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

export const createResource = <T>(api: Express, model: Model<T>, middlewares: any[] = []) => {
    api.get("/" + model.collection.name, middlewares, (req, res) => {
        model.find().then(result => {
            res.json(result);
        })
    });

    api.get("/" + model.collection.name + "/:id", middlewares, (req, res) => {
        model.findOne({ _id: new ObjectId(req.params.id) }).then(result => {
            res.json(result);
        });
    });
}
