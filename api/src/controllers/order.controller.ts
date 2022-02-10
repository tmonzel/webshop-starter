import { Request, Response } from 'express';
import { ResourceController } from '../controller';
import { OrderModel } from '../models/order.model';
import { User, UserRoles } from '../models/user.model';

export const orderController: ResourceController = {
    resourceName: OrderModel.collection.name,

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
            OrderModel.find().then(result => {
                response.json(result);
            });
        }
    },

    create(): void {
        
    }
}