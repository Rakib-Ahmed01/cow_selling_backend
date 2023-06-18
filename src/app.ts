import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler, notFoundHandler } from "./middleware/error";

// initialize app
const app: Application = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Cow Selling Backend" });
});

// error handling middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
