import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import {
  createNotesSchema,
  updateNotesSchema,
} from '../validators/notesValidator.js';
import {
  createNotes,
  getNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notesController.js';

const router = express.Router();

router.post('/', authMiddleware, validate(createNotesSchema), createNotes);

router.get('/', authMiddleware, getNotes);

router.patch('/:id', authMiddleware, validate(updateNotesSchema), updateNotes);

router.delete('/:id', authMiddleware, deleteNotes);

export default router;
