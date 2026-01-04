import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Timeline
  app.get(api.timeline.list.path, async (req, res) => {
    const timeline = await storage.getTimeline();
    res.json(timeline);
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(req.params.slug);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Posts
  app.get(api.posts.list.path, async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPost(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  // Seeding
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const timeline = await storage.getTimeline();
  if (timeline.length === 0) {
    console.log("Seeding database...");
    
    // Timeline
    await storage.createTimelineItem({
      week: 1,
      title: "Fundamentals & Onboarding",
      focus: "Core Concepts",
      content: "Deep dived into advanced JavaScript patterns and system design basics. Set up my development environment and learned the engineering standards at Scaler.",
      learnings: ["Event Loop", "Closures", "Git Workflow", "Clean Code"],
    });
    
    await storage.createTimelineItem({
      week: 2,
      title: "Problem Solving & Mini Project",
      focus: "Application",
      content: "Built a CLI tool for task management to practice modular code structure. Focused on separation of concerns and error handling.",
      learnings: ["Node.js Streams", "Command Pattern", "Unit Testing"],
    });

    await storage.createTimelineItem({
      week: 3,
      title: "Advanced Backend Engineering",
      focus: "Scalability",
      content: "Started working on a high-throughput API service. Faced challenges with database locking and solved them using optimistic concurrency control.",
      learnings: ["PostgreSQL Locking", "Redis Caching", "API Rate Limiting"],
    });

    await storage.createTimelineItem({
      week: 4,
      title: "Real-world Project Implementation",
      focus: "System Design",
      content: "Architected a microservice for notification delivery. Made key decisions on message queues vs pub/sub. Implemented the core logic.",
      learnings: ["RabbitMQ", "Microservices", "Docker"],
    });

    await storage.createTimelineItem({
      week: 5,
      title: "Final Delivery & Reflection",
      focus: "Outcome",
      content: "Deployed the notification service to production environment. Monitored performance and optimized query latencies by 40%.",
      learnings: ["CI/CD Pipelines", "Monitoring (Prometheus/Grafana)", "Production Debugging"],
    });

    // Projects
    await storage.createProject({
      slug: "notification-engine",
      title: "Scalable Notification Engine",
      shortDescription: "A high-throughput notification delivery service handling 10k+ requests/sec.",
      problem: "The legacy system was dropping notifications during traffic spikes and lacked retry mechanisms.",
      whyItMatters: "Reliable notifications are critical for user engagement and system alerts.",
      approach: "Designed an asynchronous architecture using RabbitMQ for decoupling producers and consumers. Implemented exponential backoff for retries.",
      techStack: ["Node.js", "TypeScript", "RabbitMQ", "Redis", "PostgreSQL"],
      challenges: "Handling race conditions during status updates and ensuring exactly-once delivery.",
      result: "Achieved 99.99% delivery rate and reduced latency by 60%. System now scales horizontally.",
      learnings: "Distributed systems patterns, message queue reliability, and eventual consistency.",
      repoUrl: "https://github.com/username/notification-engine",
    });

    // Skills
    await storage.createSkill({ name: "JavaScript/TypeScript", category: "Core", evidence: "Used extensively in Notification Engine project for backend logic." });
    await storage.createSkill({ name: "React", category: "Frontend", evidence: "Built the dashboard for monitoring notification status." });
    await storage.createSkill({ name: "Node.js", category: "Backend", evidence: "Developed the core API services and worker consumers." });
    await storage.createSkill({ name: "System Design", category: "Core", evidence: "Designed the architecture for the notification microservice." });
    await storage.createSkill({ name: "Docker", category: "DevOps", evidence: "Containerized applications for consistent development and production environments." });

    // Posts
    await storage.createPost({
      slug: "what-i-learned-week-3",
      title: "Reflecting on Week 3: Database Concurrency",
      summary: "Understanding how to handle race conditions in a high-traffic application.",
      content: "## The Problem\n\nWhen multiple users try to update the same resource simultaneously, we encountered lost updates.\n\n## The Solution\n\nWe implemented Optimistic Concurrency Control using version numbers in our database schema.\n\n## Key Takeaways\n\n- Always think about concurrent access.\n- Database transactions are powerful but need careful usage.\n- Testing for race conditions is hard but necessary.",
    });

    console.log("Database seeded successfully.");
  }
}
