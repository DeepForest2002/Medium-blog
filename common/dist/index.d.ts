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
