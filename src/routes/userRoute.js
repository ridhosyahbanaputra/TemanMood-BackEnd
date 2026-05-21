import express from "express";
import {
    createUser,
    getUserById,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);

router.get("/:id", authMiddleware, getUserById);

export default router;