import express, { Application, Request, Response } from "express";
import cors from "cors";

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

export default app;
