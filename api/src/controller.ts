import { Request, Response } from 'express';

export interface Controller {
    
}

export interface ResourceController extends Controller {
    resourceName: string;
    index: (request: Request, response: Response) => any;
    create: (request: Request, response: Response) => any
}