import express from 'express';
import { getUsers, createMember, createMemberr, updateMember, deleteMember, getLabTest, createLabTest, 
    updateLabTest, deleteLabTest, getAppointment, Appointment, AccepetAppointment,
    editrecordlab  } from '../controller/T_Controller.js';

const router = express.Router();

// จัดการ Member
router.get('/getUser', getUsers)
router.post('/createUser', createMember)
router.post('/createMemberr', createMemberr)

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
router.post('/AccpetAppointment/:app_id', AccepetAppointment)

router.put('/recordlab/:recordlab_id', editrecordlab )
//router.post('/AcceptAppointment', )
//router.post('/RecordOrderLab/:RecordLab_ID', )
//router.post('/LabAccept/:LabAccept_ID', )
//router.post('/LabReport/:ReportLab_ID', )

export default router;