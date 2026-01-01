import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";

export const blogRoutes = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

blogRoutes.use("*", authMiddleware);
