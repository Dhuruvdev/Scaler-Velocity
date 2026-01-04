import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const timeline = pgTable("timeline", {
  id: serial("id").primaryKey(),
  week: integer("week").notNull(),
  title: text("title").notNull(),
  focus: text("focus").notNull(),
  content: text("content").notNull(),
  learnings: text("learnings").array(), // Key concepts learned
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  problem: text("problem").notNull(),
  whyItMatters: text("why_it_matters").notNull(),
  approach: text("approach").notNull(),
  techStack: text("tech_stack").array(),
  challenges: text("challenges").notNull(),
  result: text("result").notNull(),
  learnings: text("learnings").notNull(),
  imageUrl: text("image_url"),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'frontend', 'backend', 'tools', 'core'
  evidence: text("evidence").notNull(), // "Used in Project X"
  proficiency: integer("proficiency").default(100), // Visual indicator if needed, though we prioritize evidence
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(), // Markdown content
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertTimelineSchema = createInsertSchema(timeline).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true });

// === TYPES ===

export type TimelineItem = typeof timeline.$inferSelect;
export type InsertTimelineItem = z.infer<typeof insertTimelineSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
