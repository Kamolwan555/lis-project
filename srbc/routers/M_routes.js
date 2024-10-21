import express from 'express';
import { RegisterMember, loginMember, Appointment, ReportLab } from '../controller/M_Controller.js';

const router = express.Router();

// login
router.post('/register', RegisterMember)
router.post('/login', loginMember)
router.post('/appointment', Appointment)
router.get('/RecordLab', ReportLab)

export default router;