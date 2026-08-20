import type { Request, Response } from "express";
import authService from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body);
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

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { token } = result;
    res.cookie("accessToken", token, {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    });
    return res.status(200).send({
      success: true,
      message: "Login successful!",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error from loginUser",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const authController = {
  loginUser,
  createUser,
};

export default authController;
