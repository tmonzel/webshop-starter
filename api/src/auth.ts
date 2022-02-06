import { Express } from 'express';
import { UserModel } from './models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AUTH_SECRET = "b05568cc4bd07d72d";

export const createAuth = (app: Express) => {
    app.post('/auth/signup', (req, res) => {
        const user = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
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

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            
            if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Passwort ungültig."
                });
            }

            // Passed all tests and generate token
            const token = jwt.sign({ id: user.id }, AUTH_SECRET, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
        });
    })
}