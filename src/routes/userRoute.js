import express from 'express';

import { createUser, getUserById } from '../controllers/userController.js';
import { registerSchema } from '../validators/authValidator.js';
import validate from '../middlewares/validateMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authLimiter } from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();

router.post('/', authLimiter, validate(registerSchema), createUser);

router.get('/:id', authMiddleware, getUserById);

export default router;
