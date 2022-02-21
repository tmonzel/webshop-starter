import { Router } from 'express'
import authEndpoint from './auth.endpoint';
import cartEndpoint from './cart.endpoint';
import customerEndpoint from './customer.endpoint';
import mediaEndpoint from './media.endpoint';
import ordersEndpoint from './order.endpoint';
import productEndpoint from './product.endpoint';

const router = Router();
router.use('/auth', authEndpoint);
router.use('/products', productEndpoint);
router.use('/media', mediaEndpoint);
router.use('/orders', ordersEndpoint);
router.use('/customers', customerEndpoint);
router.use('/cart', cartEndpoint);

export const apiEndpoints = router;