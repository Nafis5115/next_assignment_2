import type { Request, Response } from "express";
import authService from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
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
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful!",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
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
