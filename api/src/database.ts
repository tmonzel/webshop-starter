import mongoose from 'mongoose';

export const establishConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL ?? '');

        return connection;
    } catch(error) {
        console.error(error);
    }
}
