import { Hono } from "hono";
import { CreateUser, findUserByEmail } from "../action/user.action";
import { sign } from "hono/jwt";
export const UserRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

UserRoutes.get("/", (c) => {
  return c.text("Everthing is working fine");
});

UserRoutes.post("/api/v1/signup", async (c) => {
  const { name, email, password } = await c.req.json();
  if (!name || !email || !password) {
    return c.json({ error: "All fields are required" }, 400);
  }

  //find the user
  const Existing_user = await findUserByEmail(email, c.env.DATABASE_URL);
  if (Existing_user) return c.json({ error: "User already exists" }, 409);
  const user = await CreateUser({ name, email, password }, c.env.DATABASE_URL);
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    token: token,
  });
});
