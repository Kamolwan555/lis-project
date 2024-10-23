import express from 'express';
import { getOrders, handleCreateOrder, editorderselection, createOrderLab, createOrderSelection, DoctorAppointment } from '../controller/P_Controller.js';

const router = express.Router();

router.get('/getOrders', getOrders)

router.post('/test', createOrderLab) // test สร้าง orderlab เฉยๆ
router.post('/test2', createOrderSelection) // test สร้าง orderlabselection

router.post('/test4', DoctorAppointment) // test สร้าง appointment
router.post('/addOrderLab', handleCreateOrder) // path สร้าง orderlab และ order selection และหมอนัดให้

router.put('/orderselection/:orderlab_id', editorderselection)

export default router;