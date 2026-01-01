import { verify } from "hono/jwt";
import { Context, Next } from "hono";
import { auth } from "hono/utils/basic-auth";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");
  // check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ msg: "Unauthorized" }, 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (err) {
    return c.json({ error: "Invalid token" }, 401);
  }
}
