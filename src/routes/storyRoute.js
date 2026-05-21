import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validateMiddleware.js";
import storySchema from "../validators/storyValidator.js";
import {
    createStory,
    getStories,
    getStoryById,
    deleteStory,
} from "../controllers/storyController.js";

const router = express.Router();

router.post("/", authMiddleware, validate(storySchema), createStory);

router.get("/", getStories);

router.get("/:id", getStoryById);

router.delete("/:id", authMiddleware, deleteStory);

export default router;