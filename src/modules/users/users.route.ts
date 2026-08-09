import { Router } from "express";
import userController from "./users.controller";

const router = Router();

router.post("/create-user", userController.createUser);
router.get("/all-user", userController.getAllUsers);
router.get("/user", userController.getSingleUser);
router.patch("/update-user/:id", userController.updateUser);

const userRoutes = router;

export default userRoutes;
