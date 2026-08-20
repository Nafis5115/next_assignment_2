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

const getAllIssuesFromDB = async (query: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  const { sort = "newest", type, status } = query;
  const values: string[] = [];
  const conditions: string[] = [];

  if (!["newest", "oldest"].includes(sort)) {
    throw new Error("Invalid sort value.");
  }
  if (type && !["bug", "feature_request"].includes(type)) {
    throw new Error("Invalid type value.");
  }
  if (status && !["open", "in_progress", "resolved"].includes(status)) {
    throw new Error("Invalid status value.");
  }

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }
  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }
  const order = sort === "newest" ? "DESC" : "ASC";

  const whereClause =
    values.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `
        SELECT * FROM issues
        ${whereClause}
        ORDER BY created_at ${order}
        `,
    values,
  );

  return result;
};

const getSingleIssueFromDB = async (id: any) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
     `,
    [id],
  );

  return result;
};

const updateIssueIntoDB = async (payload: IIssue, id: any) => {
  const { title, description, type, status } = payload;

  const issueData = await pool.query(
    `
  SELECT * FROM issues WHERE id = $1
  `,
    [id],
  );

  if (issueData.rowCount === 0) {
    throw new Error("Issue not found.");
  }

  const result = await pool.query(
    `
    UPDATE  issues
    SET title = COALESCE($1, title),
    description = COALESCE($2, description),
    type = COALESCE($3, type),
    status = COALESCE($4, status)
    WHERE id = $5
    RETURNING *
    `,
    [title, description, type, status, id],
  );
  return result;
};

const deleteIssueFromDB = async (id: any, reporter_id: any, role: string) => {
  const issueData = await pool.query(
    `
  SELECT * FROM issues WHERE id = $1
  `,
    [id],
  );

  if (issueData.rowCount === 0) {
    throw new Error("Issue not found.");
  }
  const result = await pool.query(
    `
    DELETE FROM issues
    WHERE id = $1
      AND (reporter_id = $2 OR $3 = 'maintainer')
    RETURNING *
    `,
    [id, reporter_id, role],
  );
  return result;
};

const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};

export default issueService;
