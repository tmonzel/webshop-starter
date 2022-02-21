import { MediaModel } from '@/models/media.model';
import { Request, Response, Router } from 'express';
import multer from 'multer';

const mediaEndpoint = Router();
const upload = multer({ dest: './public/data/uploads/' });

// Create new media
mediaEndpoint.post('/', upload.single('file'), async (req: Request, res: Response) => {
    const media = await MediaModel.create({
        fileName: 'test.png',
        fileType: 'jpeg'
    });

    return res.status(200).send(media);
});

export default mediaEndpoint;