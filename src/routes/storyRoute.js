import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import preventDuplicateStory from '../middlewares/preventDuplicateStoryMiddleware.js';
import storySchema from '../validators/storyValidator.js';
import {
  createStory,
  getStory,
  getStoryById,
  getStoryByUserId,
  deleteStory,
} from '../controllers/storyController.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validate(storySchema),
  preventDuplicateStory,
  createStory
);

router.get('/', getStory);

router.get('/user/:userId', authMiddleware, getStoryByUserId)

router.get('/:id', getStoryById);

router.delete('/:id', authMiddleware, deleteStory);

export default router;
