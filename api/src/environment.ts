import dotenv from 'dotenv';

if(process.env.APP_ENV === 'production') {
    dotenv.config({ path: '.env.local' });
} else {
    dotenv.config({ path: '.env.dev' });
}