import mongoose from 'mongoose';

export const establishConnection = (): Promise<typeof mongoose> => {
    return mongoose.connect(process.env.DATABASE_URL ?? '');
}
