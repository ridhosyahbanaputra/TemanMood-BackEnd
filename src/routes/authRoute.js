import express from 'express';

import { loginSchema } from '../validators/authValidator.js';
import validate from '../middlewares/validateMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { login, refresh, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/authentications', validate(loginSchema), login);
router.put('/authentications', refresh);
router.delete('/authentications', authMiddleware, logout);

export default router;
