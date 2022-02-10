import { OrderModel } from '@/models/order.model';
import { Request, Response } from 'express';

export const cartController = {
    checkout(request: Request, response: Response) {
        const order = new OrderModel({
            user: request.body.user,
            items: request.body.items,
        });

        order.save(error => {
            if(error) {
                response.status(400).send(error);
                return;
            }

            response.send({ message: 'Checkout successful' });
        })
    }
}