import { Express } from 'express';
import { UserModel, UserRoles } from './models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createAuth = (app: Express) => {
    app.post('/auth/signup', (req, res) => {
        const user = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            roles: [UserRoles.CUSTOMER]
        });
        
        user.save(error => {
            if(error) {
                res.status(400).send(error);
                return;
            }

            // User successfully saved
            res.send({ message: "User was registered successfully!" })
        });
    });

    app.post('/auth/login', (req, res) => {
        UserModel.findOne({
            email: req.body.email
        }).exec((error, user) => {
            if(error) {
                res.status(500).send(error);
                return;
            }

            if (!user) {
                return res.status(404).send({ 
                    message: "Benutzer wurde nicht gefunden." 
                });
            }

            if(!user.roles.includes(UserRoles.CUSTOMER)) {
                // User missing customer role
                return res.sendStatus(402);
            }
            
            if (!bcrypt.compareSync(
                req.body.password,
                user.password
            )) {
                // Password invalid
                return res.sendStatus(400);
            }
            
            // Passed all tests. Generating token
            const token = jwt.sign({ 
                _id: user.id, 
                username: user.username,
                email: user.email 
            }, process.env.AUTH_SECRET ?? '', {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                _id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        });
    })
}