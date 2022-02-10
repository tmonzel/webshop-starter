import mongoose from 'mongoose';

export const establishConnection = (onConnected: Function) => {
    mongoose.connect('mongodb://root:admin@0.0.0.0:27017/admin').then(() => {
        onConnected();
    }).catch(error => console.error(error));
}
