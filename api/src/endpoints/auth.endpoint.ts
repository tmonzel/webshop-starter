import { User, UserModel } from '@/models/user.model';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { AuthRequest, authRequired, signToken } from '@/auth';

export const userSerializer = (user: User): any => {
    return { 
        ...user.toJSON(), 
        password: undefined, // Remove password from user,
    };
}

const authEndpoint = Router();
authEndpoint.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if(!user) {
            return res.sendStatus(404);
        }

        if (!bcrypt.compareSync(
            req.body.password,
            user.password
        )) {
            // Password invalid
            return res.sendStatus(400);
        }

        const accessToken = signToken({ 
            userId: user.id, 
            username: user.username, 
            userRoles: user.roles 
        });

        return res.status(200).send({ accessToken });

    } catch(error) {
        return res.status(500).send(error);
    }
});

// Send current user
authEndpoint.get('/user', [authRequired], async (req: AuthRequest, res: Response) => {
    return res.send(userSerializer(req.user as User));
});

export default authEndpoint;