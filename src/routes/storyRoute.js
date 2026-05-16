const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");

const { storySchema } = require("../validators/storyValidator");

const { createStory, getStories, getStoryById, deleteStory } = require("../controllers/storyController");

router.post("/", authMiddleware, validate(storySchema), createStory);

router.get("/", getStories);

router.get("/:id", getStoryById);

router.delete("/:id", authMiddleware, deleteStory);

module.exports = router;