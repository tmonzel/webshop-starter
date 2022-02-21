import { OrderModel } from '@/models/order.model';
import { Request, Response, Router } from 'express';

const cartEndpoint = Router();
cartEndpoint.post('/checkout', (req: Request, res: Response) => {
    try {
        OrderModel.create({
            user: req.body.user,
            items: req.body.items,
        });

        return res.send({ message: 'Checkout successful' });
    } catch(error) {
        return res.status(500).send(error);
    }
});

export default cartEndpoint;