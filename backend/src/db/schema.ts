import { relations } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  serial,
  text,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("username").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp().defaultNow(),
});

//create posts table (Relationship between users and posts are established)
export const Posts = pgTable("Posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  published: boolean().default(false),
  authorId: integer().references(() => users.id, {
    onDelete: "cascade",
  }),
});

// user Relation with post is one to many means one user can post many pics

export const userRelations = relations(users, ({ many }) => ({
  Posts: many(Posts),
}));

// post with user relationship is many posts can only have one user
export const PostRelations = relations(Posts, ({ one }) => ({
  author: one(users, {
    fields: [Posts.authorId],
    references: [users.id],
  }),
}));
