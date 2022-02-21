import { AuthRequest, authRequired } from '@/auth';
import { OrderModel } from '@/models/order.model';
import { User, UserRoles } from '@/models/user.model';
import { Request, Response, Router } from 'express';

const orderEndpoint = Router();

// Find all orders for authorized users
orderEndpoint.get('/', [authRequired], async (req: AuthRequest, res: Response) => {
    if(req.user?.roles.includes(UserRoles.CUSTOMER)) {
        const orders = await OrderModel.find({ user: req.user });
        res.send(orders);
    } else {
        const orders = await OrderModel.find().populate('user');
        res.send(orders);
    }
});


export default orderEndpoint;