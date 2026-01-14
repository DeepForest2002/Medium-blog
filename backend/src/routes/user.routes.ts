import { Hono } from "hono";
import {
  CreateUser,
  findUserByEmail,
  findUserEmail_And_Password,
} from "../action/user.action";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@sayan_pramanik2002/common-type";
export const UserRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

UserRoutes.get("/", (c) => {
  return c.text("This is user page");
});

UserRoutes.post("/signup", async (c) => {
  const { name, email, password } = await c.req.json();
  const result = signupInput.safeParse({
    name: name,
    email: email,
    password: password,
  });
  if (!result.success) {
    return c.json(
      {
        msg: "Invalid input",
      },
      400
    );
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

//Now Create a signin route
UserRoutes.post("/signin", async (c) => {
  //first user need to give their username
  const { email, password } = await c.req.json();
  const result = signinInput.safeParse({ email: email, password: password });
  if (!result.success) {
    return c.json(
      {
        msg: "Invalid inputs",
      },
      400
    );
  }
  const user = await findUserEmail_And_Password(
    email,
    password,
    c.env.DATABASE_URL
  );
  if (user === null)
    return c.json({ msg: "email or password is invalid" }, 409);
  const token = await sign(
    { id: user.id, email: user.email },
    c.env.JWT_SECRET
  );
  return c.json(
    {
      msg: "Login Ok",
      token: token,
    },
    200
  );
});
