import express from "express";
import { login, refresh, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/authentications", login);
router.put("/authentications", refresh);
router.delete("/authentications", logout);

export default router;