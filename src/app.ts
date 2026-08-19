import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import userRoutes from "./modules/users/users.route";
import authRoutes from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

export default app;
