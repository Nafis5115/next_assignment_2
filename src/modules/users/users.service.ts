import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUser } from "./users.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role)
    VALUES($1, $2, $3, COALESCE($4, 'contributor'))
    RETURNING *
    `,
    [name, email, hashedPassword, role],
  );

  delete result.rows[0].password;
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);

  return result;
};

const getSingleUserFromDB = async (email: any) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  return result;
};

const updateUserIntoDB = async (payload: IUser, id: any) => {
  const { name, email, password } = payload;
  const result = await pool.query(
    `
    UPDATE users
    SET name = COALESCE($1, name),
    email = COALESCE($2, email),
    password = COALESCE($3, password)
    WHERE id = $4
    RETURNING *
    `,
    [name, email, password, id],
  );

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
};
