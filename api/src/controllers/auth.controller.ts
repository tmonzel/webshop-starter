import { Request, Response } from 'express';
import { UserModel, UserRoles } from '@/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authController = {
    register(request: Request, response: Response) {
        const user = new UserModel({
            email: request.body.email,
            username: request.body.username,
            password: bcrypt.hashSync(request.body.password, 8),
            roles: [UserRoles.CUSTOMER]
        });
        
        user.save(error => {
            if(error) {
                response.status(400).send(error);
                return;
            }

            // User successfully saved
            response.send({ message: "User was registered successfully!" })
        });
    },

    login(request: Request, response: Response) {
        UserModel.findOne({
            username: request.body.username
        }).exec((error, user) => {
            if(error) {
                response.status(500).send(error);
                return;
            }

            if (!user) {
                return response.status(404).send({ 
                    message: "Benutzer wurde nicht gefunden." 
                });
            }

            if(!user.roles.includes(UserRoles.CUSTOMER)) {
                // User missing customer role
                return response.sendStatus(402);
            }
            
            if (!bcrypt.compareSync(
                request.body.password,
                user.password
            )) {
                // Password invalid
                return response.sendStatus(400);
            }
            
            // Passed all tests. Generating token
            const token = jwt.sign({ 
                _id: user.id, 
                username: user.username,
                email: user.email,
                roles: user.roles
            }, process.env.AUTH_SECRET ?? '', {
                expiresIn: 86400 // 24 hours
            });

            response.status(200).send({
                _id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        })
    }
}