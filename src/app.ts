import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import authRoutes from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import issueRoutes from "./modules/issues/issues.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/", issueRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

export default app;
