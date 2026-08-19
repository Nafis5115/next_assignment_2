import { Router } from "express";
import issueController from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/create-issue", auth("contributor"), issueController.createIssue);

const issueRoutes = router;

export default issueRoutes;
