import zod from "zod";

export const signupInput = zod.object({
  name: zod.string().min(5),
  email: zod.string().email(),
  password: zod.string().min(8),
});
export type signupType = zod.infer<typeof signupInput>;

//signin input
export const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
export type signinType = zod.infer<typeof signinInput>;
