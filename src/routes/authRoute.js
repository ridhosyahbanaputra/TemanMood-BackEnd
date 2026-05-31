import express from 'express';
import { login, refresh, logout } from '../controllers/authController.js';
import validate from '../middlewares/validateMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  loginSchema,
  refreshTokenSchema,
} from '../validators/authValidator.js';
import { authLimiter } from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();

router.post('/authentications', authLimiter, validate(loginSchema), login);

router.put('/authentications', validate(refreshTokenSchema), refresh);

router.delete(
  '/authentications',
  authMiddleware,
  validate(refreshTokenSchema),
  logout
);

export default router;
