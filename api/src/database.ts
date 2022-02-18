import mongoose from 'mongoose';

export const establishConnection = (onConnected: Function) => {
    mongoose.connect(process.env.DATABASE_URL ?? '').then(() => {
        onConnected();
    }).catch(error => console.error(error));
}
