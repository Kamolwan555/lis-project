import express from 'express';
import { getUsers } from '../controller/T_Controller.js';

const router = express.Router();

// กำหนดเส้นทางสำหรับการดึงข้อมูลผู้ใช้
router.get('/getUser', getUsers); // เมื่อเข้าถึง /getUser จะเรียกใช้ฟังก์ชัน getUsers

export default router;