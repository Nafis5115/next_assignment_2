import type { Request, Response } from "express";
import authService from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    const { accessToken } = result;
    res.cookie("accessToken", accessToken, {
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    });
    return res.status(201).send({
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
};

export default authController;
