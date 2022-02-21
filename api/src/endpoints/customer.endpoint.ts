import { allowAdminOnly, AuthRequest, authRequired } from '@/auth';
import { CustomerModel } from '@/models/customer.model';
import { UserRoles } from '@/models/user.model';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';

const customerEndpoint = Router();

// Find all customers only for authorized admins
customerEndpoint.get('/', [authRequired, allowAdminOnly], async (req: AuthRequest, res: Response) => {
    const customers = await CustomerModel.find();
    return res.send(customers);
});

// Find one customer by id
customerEndpoint.get('/:id', [authRequired, allowAdminOnly], async (req: AuthRequest, res: Response) => {
    const product = await CustomerModel.findById(req.params.id);
    return res.send(product);
});

// Register new customer 
customerEndpoint.post('/', async (req: Request, res: Response) => {
    try {
        const customer = await CustomerModel.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            roles: [ UserRoles.CUSTOMER ],
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email
        });

        return res.send(customer);
    } catch(error) {
        return res.status(400).send(error);
    }
});


export default customerEndpoint;