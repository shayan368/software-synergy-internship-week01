import express from 'express'
import { register, login, profile, logout, verifyEmail, forgotPassword, resetPassword, verifyLogin2FA, enable2FA, changePassword } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/logout', logout)

router.get('/verify/:token', verifyEmail);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post('/login/2fa', verifyLogin2FA);
router.post('/2fa/enable', authMiddleware, enable2FA);
router.post('/change-password', authMiddleware, changePassword);

export default router;