import { Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.post("/login", authController.loginUser);

const authRoutes = router;

export default authRoutes;
