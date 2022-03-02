import dotenv from 'dotenv';

switch(process.env.APP_ENV) {
    case 'production':
        dotenv.config({ path: '.env.local' });
        break;
    case 'test':
        dotenv.config({ path: '.env.test' });
        break;
    default:
        dotenv.config({ path: '.env.dev' });
}