import zod from "zod";
export declare const signupInput: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
export type signupType = zod.infer<typeof signupInput>;
export declare const signinInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
export type signinType = zod.infer<typeof signinInput>;
export declare const createPostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    authorId: zod.ZodNumber;
}, zod.core.$strip>;
export type createPostType = zod.infer<typeof createPostInput>;
export declare const updatePostInput: zod.ZodObject<{
    id: zod.ZodNumber;
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
    authorId: zod.ZodNumber;
}, zod.core.$strip>;
