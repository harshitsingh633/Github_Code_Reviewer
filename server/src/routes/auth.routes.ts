import { Router } from "express";
import { githubLogin, signin, signup } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getRepos, githubCallback } from "../services/auth.service";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/auth/github", githubLogin);
router.get("/auth/callback", githubCallback);
router.get("/auth/getrepos", authMiddleware, getRepos);

export default router;