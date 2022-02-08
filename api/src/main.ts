import express from 'express';
import cors from 'cors';
import { createResource } from './resource-creator';
import { ProductModel } from './models/product.model';
import mongoose from 'mongoose';
import { createAuth } from './auth';
import { createCart } from './cart';
import { OrderModel } from './models/order.model';

mongoose.connect('mongodb://root:admin@0.0.0.0:27017/admin').then(client => {

    // Initialize application
    const api = express();

    // Allow cross origin requests for all routes
    api.use(cors());

    // Parse content-type application/json 
    api.use(express.json());
    
    // Bind resource endpoints
    createResource(api, ProductModel);
    createResource(api, OrderModel);

    // Bind auth endpoint
    createAuth(api);

    // Bind cart endpoint
    createCart(api);

    api.listen(3000, () => console.log('API ist listening on port 3000'));

}).catch(error => console.error(error));
