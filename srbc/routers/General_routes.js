import express from 'express';
import { RegisterMember, loginMember} from '../controller/General_Controller.js';

const router = express.Router();

// login
router.post('/register', RegisterMember)
router.post('/login', loginMember)

export default router;