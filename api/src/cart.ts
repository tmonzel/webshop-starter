import { Express } from 'express';
import { OrderModel } from './models/order.model';

export const createCart = (app: Express) => {
    app.post('/cart', (req, res) => {
        const order = new OrderModel({
            user: req.body.user,
            items: req.body.items,
        });

        order.save(error => {
            if(error) {
                res.status(400).send(error);
                return;
            }

            res.send({ message: 'Checkout successful' });
        })
    });
}