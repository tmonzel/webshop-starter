import { Request, RequestHandler, Response } from 'express';

export interface Controller {
    
}

export interface ResourceController extends Controller {
    resourceName: string;
    uses?: Array<RequestHandler>; // Middlewares
    index: (request: Request, response: Response) => any;
    pick?: (request: Request, response: Response) => any;
    create?: (request: Request, response: Response) => any;
}