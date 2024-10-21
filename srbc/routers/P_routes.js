import express from 'express';
import { getOrders, createOrderLab } from '../controller/P_Controller.js';

const router = express.Router();

router.get('/getOrders', getOrders)
router.post('/addOrderLab', createOrderLab)

export default router;