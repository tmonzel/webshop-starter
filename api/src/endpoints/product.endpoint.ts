import { authRequired } from '@/auth';
import { ProductModel } from '@/models/product.model';
import { Request, Response, Router } from 'express';

const productEndpoint = Router();

// Index
productEndpoint.get('/', async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    return res.status(200).send(products);
});

// Find one by id
productEndpoint.get('/:id', async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);
    return res.status(200).send(product);
});

// Update one by id
productEndpoint.patch('/:id', async (req: Request, res: Response) => {
    await ProductModel.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
    return res.sendStatus(204);
});

// Create new
productEndpoint.post('/', async (req: Request, res: Response) => {
    const product = await ProductModel.create(req.body);
    return res.status(201).send(product);
});

// Delete product
productEndpoint.delete('/:id', [authRequired], async (req: Request, res: Response) => {
    const result = await ProductModel.findByIdAndDelete(req.params.id);
    return res.status(204).send(result);
});

export default productEndpoint;