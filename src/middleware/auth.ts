import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        return res.status(401).send({ message: "Unauthorized access!" });
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
        return res.status(404).send({
          message: "User not found!",
        });
      }
      req.user = user;
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).send({
          message: "Forbidden access!",
        });
      }

      next();
    } catch (error) {
      throw new Error("Internal problem from auth middleware");
    }
  };
};

export default auth;
