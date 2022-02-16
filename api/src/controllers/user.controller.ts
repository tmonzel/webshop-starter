import { ResourceController } from '@/controller';
import { User, UserModel } from '@/models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const userSerializer = (user: User): any => {
    return { 
        ...user.toJSON(), 
        password: undefined, // Remove password from user,
    };
}

export const userController: ResourceController = {
    resourceName: UserModel.collection.name,

    index(request: Request, response: Response) {
        UserModel.find().then(result => {
            response.json(result.map(userSerializer));
        });
    },

    pick(request: Request, response: Response) {
        UserModel.findOne({ _id: new ObjectId(request.params.id) }).then(result => {
            response.json(userSerializer(result as User));
        });
    }
}