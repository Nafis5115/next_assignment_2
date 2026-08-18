import { pool } from "../../db";
import bcrypt from "bcrypt";
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );
  if (userData.rowCount === 0) {
    throw new Error("User not found!");
  }
  const user = userData.rows[0];
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new Error("Password in incorrect.");
  }
};

const authService = {
  loginUserIntoDB,
};

export default authService;
