import { Express } from 'express';
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';

export const createResource = <T>(api: Express, model: Model<T>) => {
    api.get("/" + model.collection.name, (req, res) => {
        model.find().then(result => {
            res.json(result);
        })
    });

    api.get("/" + model.collection.name + "/:id", (req, res) => {
        model.findOne({ _id: new ObjectId(req.params.id) }).then(result => {
            res.json(result);
        });
    });
}
