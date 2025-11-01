import express from 'express';
import { login, register } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { sendOtp } from '../controllers/otp.controller.js';

const router = express.Router();
router.post('/login',login)
router.post('/register',register)
router.post('/send-otp',sendOtp)

export default router;