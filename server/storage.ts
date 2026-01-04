import { db } from "./db";
import { timeline, projects, skills, posts } from "@shared/schema";
import type { TimelineItem, Project, Skill, Post, InsertTimelineItem, InsertProject, InsertSkill, InsertPost } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTimeline(): Promise<TimelineItem[]>;
  getProjects(): Promise<Project[]>;
  getProject(slug: string): Promise<Project | undefined>;
  getSkills(): Promise<Skill[]>;
  getPosts(): Promise<Post[]>;
  getPost(slug: string): Promise<Post | undefined>;
  
  // Seeding methods
  createTimelineItem(item: InsertTimelineItem): Promise<TimelineItem>;
  createProject(item: InsertProject): Promise<Project>;
  createSkill(item: InsertSkill): Promise<Skill>;
  createPost(item: InsertPost): Promise<Post>;
}

export class DatabaseStorage implements IStorage {
  async getTimeline(): Promise<TimelineItem[]> {
    return await db.select().from(timeline).orderBy(timeline.week);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts);
  }

  async getPost(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createTimelineItem(item: InsertTimelineItem): Promise<TimelineItem> {
    const [newItem] = await db.insert(timeline).values(item).returning();
    return newItem;
  }

  async createProject(item: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(item).returning();
    return newProject;
  }

  async createSkill(item: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(item).returning();
    return newSkill;
  }

  async createPost(item: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(item).returning();
    return newPost;
  }
}

export const storage = new DatabaseStorage();
