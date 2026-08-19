import type { Request, Response } from "express";
import { userService } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    res.status(201).send({
      success: true,
      message: "User registered successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error from createUser",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    if (result.rows.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No user found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully get all users!",
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error from getAllUsers",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUserFromDB(req.query.email);
    if (result.rows.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No user found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully get single user!",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error from getSingleUser",
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUserIntoDB(req.body, req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No user found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Successfully get single user!",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error from updateUser",
      error: error,
    });
  }
};

const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};

export default userController;
