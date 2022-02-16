import { ResourceController } from '@/controller';
import { CustomerModel } from '@/models/customer.model';
import { User, UserRoles } from '@/models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { userSerializer } from './user.controller';
import bcrypt from 'bcrypt';

export const customerController: ResourceController = {
    resourceName: 'customers',

    index(request: Request, response: Response) {
        CustomerModel.find().then(result => {
            response.json(result.map(userSerializer));
        });
    },

    pick(request: Request, response: Response) {
        CustomerModel.findOne({ _id: new ObjectId(request.params.id) }).then(result => {
            response.json(userSerializer(result as User));
        });
    },

    create(request: Request, response: Response) {
        const customer = new CustomerModel({
            username: request.body.username,
            password: bcrypt.hashSync(request.body.password, 8),
            roles: [ UserRoles.CUSTOMER ],
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            address: request.body.address,
            email: request.body.email
        });
        
        customer.save(error => {
            if(error) {
                response.status(400).send(error);
                return;
            }

            response.sendStatus(200);
        });
    }
}