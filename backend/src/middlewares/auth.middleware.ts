import { verify } from "hono/jwt";
import { auth } from "hono/utils/basic-auth";
export async function authMiddleware(c: any, next: any) {
  // first of all get the header ,
  // verify the header
  const authHeader = c.req.header("authorization");

  //check if authHeader is present or not
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ msg: "Unauthorized" }, 401);
  }

  // second - split the auth Header and get the token
  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    //attach user info to the context
    c.attach("user", payload);
    await next();
  } catch (err) {
    return c.json({ msg: "Invalid token" }, 401);
  }
}
