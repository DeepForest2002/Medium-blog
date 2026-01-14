import zod, { email } from "zod";

export const signupInput = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

export type signupType = zod.infer<typeof signupInput>;

export const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

export type signinType = zod.infer<typeof signinInput>;

export const createPostInput = zod.object({
  title: zod.string(),
  content: zod.string(),
  authorId: zod.number(),
});
export type createPostType = zod.infer<typeof createPostInput>;

export const updatePostInput = zod.object({
  id: zod.number(),
  title: zod.string().optional(),
  content: zod.string().optional(),
  authorId: zod.number(),
});
