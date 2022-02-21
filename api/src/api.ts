import express, { Express } from 'express';
import cors from 'cors';
import { apiEndpoints } from './endpoints';

export const createApi = (): Express => {
    // Initialize application
    const app = express();

    // Allow cross origin requests for all routes
    app.use(cors());

    // Parse content-type application/json 
    app.use(express.json());

    // Bind endpoints
    app.use('/api/v1', apiEndpoints);

    return app;
}
