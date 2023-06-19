import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler, notFoundHandler } from "./middleware/error";
import { router } from "./routes";
import { StatusCodes } from "http-status-codes";

// initialize app
const app: Application = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/api/v1", (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "Welcome to Cow Selling Server! 🐱‍🏍" });
});

// routes
app.use("/", router);

// error handling middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
