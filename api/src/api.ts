import express, { Express } from 'express';
import cors from 'cors';
import { apiEndpoints } from './endpoints';

// Initialize application
const app = express();

// Allow cross origin requests for all routes
app.use(cors());

// Parse content-type application/json 
app.use(express.json({ limit: '2mb' }));

// Bind endpoints
app.use('/api/v1', apiEndpoints);

export default app;
