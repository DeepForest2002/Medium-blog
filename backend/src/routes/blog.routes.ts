import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createPostInput,
  updatePostInput,
} from "@sayan_pramanik2002/common-type";
import {
  CreatePost,
  UpdatePost,
  FindPost,
  GetAllBlogs,
} from "../action/posts.action";
export const blogRoutes = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

blogRoutes.use("/*", authMiddleware);

blogRoutes.post("/createPost", async (c) => {
  const { title, content, authorId } = await c.req.json();
  const result = createPostInput.safeParse({
    title: title,
    content: content,
    authorId: authorId,
  });
  if (!result.success) {
    return c.json({ msg: "Invalid Inputs" }, 400);
  }
  const post = await CreatePost(
    { title, content, authorId },
    c.env.DATABASE_URL
  );
  if (!post) return c.json({ msg: "Post cannot be cretaed" }, 409);
  return c.json(
    {
      msg: "Post Created",
      post: post.id,
    },
    200
  );
});

//Create a route to update the blog
blogRoutes.put("/updateBlog", async (c) => {
  // update the blog where id + authorid
  const { id, title, content, authorId } = await c.req.json();
  const result = updatePostInput.safeParse({ id: id, authorId: id });
  if (!result.success) {
    return c.json({ msg: "Invalid inputs" }, 400);
  }
  const updated_post = await UpdatePost(
    { id, title, content, authorId },
    c.env.DATABASE_URL
  );
  if (!updated_post)
    return c.json({ msg: "Post cannot be updated due to some error" }, 409);
  return c.json({
    msg: "Post Updated",
    PostId: updated_post.id,
  });
});

// Create a route to get a blog
blogRoutes.get("/getBlog/:id", async (c) => {
  const authorId = c.req.param("id");
  if (!authorId) return c.json({ msg: "AuthorId is not found" }, 400);
  const id = Number(authorId);
  if (Number.isNaN(id)) return c.json({ msg: "Invalid author id" }, 400);
  const find_post = await FindPost(id, c.env.DATABASE_URL);
  if (find_post === null)
    return c.json({ msg: "This post is not present" }, 409);
  return c.json({
    msg: "Post is present",
    title: find_post.title,
    content: find_post.content,
  });
});

blogRoutes.get("/bulk", async (c) => {
  const result = await GetAllBlogs(c.env.DATABASE_URL);
  if (result === null) return c.json({ msg: "No Blogs present" }, 409);
  return c.json({
    result: [result],
  });
});
