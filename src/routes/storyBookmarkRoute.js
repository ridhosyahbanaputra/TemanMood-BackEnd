import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  addStoryBookmark,
  removeStoryBookmark,
  getStoryBookmarks,
} from '../controllers/storyBookmarkController.js';

const router = express.Router();

router.post('/:storyId', authMiddleware, addStoryBookmark);

router.get('/', authMiddleware, getStoryBookmarks);

router.delete('/:storyId', authMiddleware, removeStoryBookmark);


export default router;
