import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import { createDailyCheckInSchema } from '../validators/dailyCheckInValidator.js';
import {
  createDailyCheckIn,
  getDailyCheckIns,
  getTodayDailyCheckIn,
  getDailyCheckInById,
} from '../controllers/dailyCheckInController.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validate(createDailyCheckInSchema),
  createDailyCheckIn
);

router.get('/', authMiddleware, getDailyCheckIns);

router.get('/today', authMiddleware, getTodayDailyCheckIn);

router.get('/:id', authMiddleware, getDailyCheckInById);

export default router;
