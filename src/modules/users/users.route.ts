import { Router } from "express";
import userController from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/create-user", userController.createUser);
router.get("/all-user", auth(), userController.getAllUsers);
router.get("/user", userController.getSingleUser);
router.patch("/update-user/:id", userController.updateUser);

const userRoutes = router;

export default userRoutes;
