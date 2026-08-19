import { pool } from "../../db";
import type { IIssue } from "./issues.interface";

const createIssueIntoDB = async (payload: IIssue, reporterId: number) => {
  const { title, description, type, status } = payload;

  if (!title || !description || !type) {
    throw new Error("Every fields are required.");
  }

  const user = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
     `,
    [reporterId],
  );
  if (user.rows.length === 0) {
    throw new Error("User not exists");
  }

  const result = await pool.query(
    `
    INSERT INTO issues(reporter_id,title, description, type, status)
    VALUES($1, $2, $3, $4, COALESCE($5, 'open'))
    RETURNING *
    `,
    [reporterId, title, description, type, status],
  );
  return result;
};

const issueService = {
  createIssueIntoDB,
};

export default issueService;
