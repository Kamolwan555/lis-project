import express from 'express';
import { getUsers, createMember, updateMember, deleteMember, getLabTest, createLabTest, updateLabTest, deleteLabTest, getAppointment, Appointment } from '../controller/T_Controller.js';

const router = express.Router();

// จัดการ Member
router.get('/getUser', getUsers)
router.post('/createUser', createMember)
router.put('/updateMember/:member_id', updateMember)
router.delete('/deleteMember/:member_id', deleteMember)

// จัดการ LabTest
router.get('/getTest', getLabTest)
router.post('/createLab', createLabTest)
router.put('/updateLab/:labTest_id', updateLabTest)
router.delete('/deleteLab/:labTest_id', deleteLabTest)

//จัดการเกี่ยวกับผลแลป
router.get('/getAppointment', getAppointment)
router.post('/Appointment', Appointment)
//router.post('/AcceptAppointment', )
//router.post('/RecordOrderLab/:RecordLab_ID', )
//router.post('/LabAccept/:LabAccept_ID', )
//router.post('/LabReport/:ReportLab_ID', )

export default router;