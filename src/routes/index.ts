import express, { Router } from "express";
import { authRouter } from "../app/modules/auth/auth.route";
import { userRouter } from "../app/modules/user/user.route";
import { cowRouter } from "../app/modules/cow/cow.route";

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
  {
    path: "/api/v1/cows",
    route: cowRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.route));
