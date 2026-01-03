import { Hono } from "hono";
import { UserRoutes } from "./routes/user.routes";
import { blogRoutes } from "./routes/blog.routes";
import { cors } from "hono/cors";
const app = new Hono();
app.use(cors());
app.get("/", (c) => {
  return c.text("Everything is working fine");
});
app.route("/api/v1/user", UserRoutes);
app.route("/api/v1/blog", blogRoutes);
export default app;
