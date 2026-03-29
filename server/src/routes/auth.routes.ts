import { Router } from "express";
import { githubLogin, signin, signup } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/auth/signup",signup);
router.post("/auth/signin",signin);
router.post("/auth/gitrepo",githubLogin)
export default router;