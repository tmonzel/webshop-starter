import { Request, Response } from 'express';
import { ResourceController } from '../controller';
import { authRequired } from '../middlewares';
import { OrderModel } from '@/models/order.model';
import { User, UserRoles } from '@/models/user.model';

export const orderController: ResourceController = {
    resourceName: OrderModel.collection.name,

    // Include needed middleware for all routes
    uses: [authRequired],

    index(request: Request & { user?: User }, response: Response) {
        if(!request.user) {
            // User only endpoint
            return response.sendStatus(400);
        }

        if(request.user.roles.includes(UserRoles.CUSTOMER)) {
            // Return all orders for specific customer
            OrderModel.find({ user: request.user }).then(result => {
                response.json(result);
            });
        } else {
            OrderModel.find().populate('user').then(result => {
                response.json(result);
            });
        }
    },

    create(): void {
        
    }
}