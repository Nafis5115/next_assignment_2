import type { Request, Response } from "express";
import issueService from "./issues.service";
import sendResponse from "../../utils/sendResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDB(req.body, req.user?.id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error from createIssue",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB(req.query);

    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "No issue found!",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrieved successfully!",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error from getAllIssues",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getSingleIssueFromDB(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
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
      req.user?.id,
      req.user?.role,
    );
    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 403,
        success: true,
        message: "You are not able to update this issue.",
        data: result.rows[0],
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error from updateIssue",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.deleteIssueFromDB(
      req.params.id,
      req.user?.id,
      req.user?.role,
    );
    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "You are not allowed to delete this issue.",
      });
    }
    sendResponse(res, {
      statusCode: 203,
      success: true,
      message: "Issue deleted successfully!",
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Error from deleteIssue",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};

export default issueController;
