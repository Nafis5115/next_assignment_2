import { Router } from "express";
import issueController from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/issues", auth("contributor"), issueController.createIssue);
router.get("/issues", auth(), issueController.getAllIssues);
router.get("/issues/:id", auth(), issueController.getSingleIssue);
router.patch("/issues/:id", auth("contributor"), issueController.updateIssue);
router.delete("/issues/:id", auth("contributor"), issueController.deleteIssue);
const issueRoutes = router;

export default issueRoutes;
