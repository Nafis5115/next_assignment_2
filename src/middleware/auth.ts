import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";
import sendResponse from "../utils/sendResponse";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access!",
        });
      }
      const decoded = jwt.verify(accessToken, config.jwt_secret!) as JwtPayload;

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `,
        [decoded.email],
      );
      const user = userData.rows[0];
      if (!user) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "User not found!",
        });
      }
      req.user = user;
      if (roles.length && !roles.includes(user.role)) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden access!",
        });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Token has expired. Please login again.",
        });
      }
      throw new Error("Internal problem from auth middleware");
    }
  };
};

export default auth;
