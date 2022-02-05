import { Express } from 'express';
import { Db, ObjectId } from 'mongodb';

export const createResource = (api: Express, db: Db, identifier: string) => {
    const collection = db.collection(identifier);

    api.get("/" + identifier, (req, res) => {
        collection.find().toArray().then(result => {
            res.json(result);
        })
    });

    api.get("/" + identifier + "/:id", (req, res) => {
        collection.findOne({ _id: new ObjectId(req.params.id) }).then(result => {
            res.json(result);
        });
    });
}
