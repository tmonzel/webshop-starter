import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { createResource } from './resource-creator';

MongoClient.connect('mongodb://root:admin@localhost:27017').then(client => {

    // Initialize application
    const api = express();
    const db = client.db('admin');

    // Allow cross origin requests for all routes
    api.use(cors());

    createResource(api, db, 'products');

    api.listen(3000, () => console.log('API ist listening on port 3000'));

}).catch(error => console.error(error));
