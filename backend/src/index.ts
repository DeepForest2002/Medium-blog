import { Hono } from "hono";
import { UserRoutes } from "./routes/user.router";
const app = new Hono();

app.route("/users", UserRoutes);
export default app;
