import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    res.status(200).send({
      success: true,
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "Error from createUser",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    res.status(200).send({
      success: true,
      message: "Successfully get all users!",
      data: result.rows,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "Error from getAllUsers",
      error: error,
    });
  }
};

const userController = {
  createUser,
  getAllUsers,
};

export default userController;
