import zod from "zod";
export declare const signinInput: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
export type signinType = zod.infer<typeof signinInput>;
