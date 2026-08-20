import type { Request, Response } from "express";
import issueService from "./issues.service";

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDB(req.body, req.user?.id);
    res.status(201).send({
      success: true,
      message: "Issue created successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error from createIssue",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB(req.query);
    res.status(200).send({
      success: true,
      message: "Issue retrieved successfully!",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error from getAllIssues",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getSingleIssueFromDB(req.params.id);
    res.status(200).send({
      success: true,
      message: "Issue retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error from getSingleIssue",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.updateIssueIntoDB(
      req.body,
      req.params.id,
    );
    res.status(200).send({
      success: true,
      message: "Issue updated successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error from updateIssue",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
};

export default issueController;
