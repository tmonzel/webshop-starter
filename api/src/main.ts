import './environment';
import express from 'express';
import cors from 'cors';
import { createResourceFromController } from './resource-creator';
import { orderController } from './controllers/order.controller';
import { authController } from './controllers/auth.controller';
import { cartController } from './controllers/cart.controller';
import { productController } from './controllers/product.controller';
import { establishConnection } from './database';
import { userController } from './controllers/user.controller';
import { customerController } from './controllers/customer.controller';



establishConnection(() => {

    // Initialize application
    const api = express();

    // Allow cross origin requests for all routes
    api.use(cors());

    // Parse content-type application/json 
    api.use(express.json());
    
    // Bind resource endpoints
    createResourceFromController(api, productController);
    createResourceFromController(api, orderController);
    createResourceFromController(api, userController);
    createResourceFromController(api, customerController);

    // Bind cart actions
    api.post('/cart', cartController.checkout);

    // Bind auth actions
    //api.post('/auth/signup', authController.register);
    api.post('/auth/login', authController.login);

    api.listen(3000, () => console.log('API is listening on port 3000'));

});
