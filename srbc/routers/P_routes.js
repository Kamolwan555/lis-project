import express from 'express';
import { getOrders, handleCreateOrder, editorderselection } from '../controller/P_Controller.js';

const router = express.Router();

router.get('/getOrders', getOrders)
router.post('/addOrderLab', handleCreateOrder)
router.put('/orderselection/:orderlab_id', editorderselection)

export default router;