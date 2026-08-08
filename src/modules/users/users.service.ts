import { pool } from "../../db";

const createUserIntoDB = async (payload: any) => {
  const { name, email, password, role } = payload;

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role)
    VALUES($1, $2, $3, COALESCE($4, 'contributor'))
    RETURNING *
    `,
    [name, email, password, role],
  );

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
};
