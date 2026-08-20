import { Router } from "express";
import issueController from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/create-issue", auth("contributor"), issueController.createIssue);
router.get("/all-issues", auth(), issueController.getAllIssues);

const issueRoutes = router;

export default issueRoutes;
