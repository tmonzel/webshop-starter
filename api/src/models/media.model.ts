import { model, Schema } from 'mongoose';

export interface Media {
    fileName: string;
    fileType: string;
}

const schema = new Schema<Media>({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true }
})

export const MediaModel = model<Media>('Media', schema);
