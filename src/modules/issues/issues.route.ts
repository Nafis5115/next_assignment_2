import { Router } from "express";
import issueController from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/issues", auth(), issueController.createIssue);
router.get("/issues", issueController.getAllIssues);
router.get("/issues/:id", issueController.getSingleIssue);
router.patch("/issues/:id", auth(), issueController.updateIssue);
router.delete("/issues/:id", auth("maintainer"), issueController.deleteIssue);
const issueRoutes = router;

export default issueRoutes;
