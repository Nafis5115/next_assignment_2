import type { Request, Response } from "express";
import authService from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    res.status(201).send({
      success: true,
      message: "Login successful!",
      //   data: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error from loginUser",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const authController = {
  loginUser,
};

export default authController;
