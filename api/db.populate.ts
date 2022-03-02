import '@/environment';
import { establishConnection } from '@/database';
import { ProductModel } from '@/models/product.model';
import { UserModel, UserRoles } from '@/models/user.model';
import bcrypt from 'bcrypt';
import { productFixtures } from './tests/fixtures/product.fixtures';

/**
 * Initialize script to prefill the database with fixture data
 * 
 */

establishConnection();

const execCommand = async () => {
    // Truncate all data initially
    await UserModel.deleteMany();
    await ProductModel.deleteMany();

    // Populate fixtures
    productFixtures.forEach(async(p) => {
        await ProductModel.create(p);
        console.log("Product created: " + p.name);
    });

    // Create a pseudo admin user
    await UserModel.create({
        username: 'admin',
        password: bcrypt.hashSync('root', 8),
        roles: [UserRoles.ADMIN]
    });

    console.log("Admin user created");

    process.exit();
}

execCommand();
