import express, { Application } from "express";
import cors from "cors";
import { globalErrorHandler, notFoundHandler } from "./middleware/error";
import { router } from "./routes";

// initialize app
const app: Application = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", router);

// error handling middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
