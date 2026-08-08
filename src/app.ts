import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import userRoutes from "./modules/users/users.route";

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

export default app;
