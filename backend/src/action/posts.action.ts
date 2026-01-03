import { createDb } from "../db";
import { Posts } from "../db/schema";
import { and, eq } from "drizzle-orm";
type PostsType = {
  title: string;
  content: string;
  authorId: number;
};

export async function CreatePost(data: PostsType, databaseUrl: string) {
  const db = createDb(databaseUrl);
  const [post] = await db
    .insert(Posts)
    .values({
      title: data.title,
      content: data.content,
      authorId: data.authorId,
    })
    .returning({ id: Posts.id });
  return post;
}

type UpdateTypes = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

export async function UpdatePost(data: UpdateTypes, databaseUrl: string) {
  const db = createDb(databaseUrl);
  const [updated_post] = await db
    .update(Posts)
    .set({ title: data.title, content: data.content })
    .where(and(eq(Posts.id, data.id), eq(Posts.authorId, data.authorId)))
    .returning({ id: Posts.id });

  return updated_post;
}

export async function FindPost(id: number, databaseUrl: string) {
  const db = createDb(databaseUrl);
  const post = await db.select().from(Posts).where(eq(Posts.id, id)).limit(1);
  if (post.length > 0) return post[0];
  else return null;
}

export async function GetAllBlogs(databaseUrl: string) {
  const db = createDb(databaseUrl);
  const [result] = await db.select().from(Posts).limit(10);
  if (!result) return null;
  else return result;
}
