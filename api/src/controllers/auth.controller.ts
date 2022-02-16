import { Request, Response } from 'express';
import { UserModel } from '@/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authController = {
    login(request: Request, response: Response) {
        UserModel.findOne({
            username: request.body.username
        }).exec((error, user) => {
            if(error) {
                response.status(500).send(error);
                return;
            }

            if (!user) {
                return response.sendStatus(404);
            }
            
            if (!bcrypt.compareSync(
                request.body.password,
                user.password
            )) {
                // Password invalid
                return response.sendStatus(400);
            }
            
            // Passed all tests. Generating token
            const accessToken = jwt.sign({
                username: user.username,
                roles: user.roles
            }, process.env.AUTH_SECRET ?? '', {
                expiresIn: 86400 // 24 hours
            });

            response.status(200).send({ accessToken });
        })
    }
}