import { establishConnection } from '../database';
import { UserModel, UserRoles } from '../models/user.model';
import bcrypt from 'bcrypt';

establishConnection(() => {
    const user = new UserModel({
        username: 'admin',
        password: bcrypt.hashSync('root', 8),
        roles: [UserRoles.ADMIN]
    });

    user.save(err => {
        if(err) {
            console.error('Could not create admin user');
            return;
        }

        console.log('Admin user created');
    });
});
