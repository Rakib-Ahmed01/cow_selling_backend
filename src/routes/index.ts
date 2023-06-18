import express, { Router } from "express";
import { authRouter } from "../app/modules/auth/auth.route";
import { userRouter } from "../app/modules/user/user.route";

export const router = express.Router();

type Route = {
  path: string;
  route: Router;
};

const routes: Route[] = [
  {
    path: "/api/v1/auth",
    route: authRouter,
  },
  {
    path: "/api/v1/users",
    route: userRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.route));
