import OpenAI from "openai";
import { chatStorage } from "./storage";
import type { Express, Request, Response } from "express";

const xai = new OpenAI({
  apiKey: process.env.XAI_API_KEY || "dummy_key",
  baseURL: "https://api.x.ai/v1",
});

export function registerChatRoutes(app: Express): void {
  app.get("/api/conversations", async (_req: Request, res: Response) => {
    try {
      const conversations = await chatStorage.getAllConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/conversations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await chatStorage.getConversation(id);
      if (!conversation) return res.status(404).json({ error: "Conversation not found" });
      const messages = await chatStorage.getMessagesByConversation(id);
      res.json({ ...conversation, messages });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const { title } = req.body;
      const conversation = await chatStorage.createConversation(title || "New Chat");
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  app.post("/api/conversations/:id/messages", async (req: Request, res: Response) => {
    try {
      const conversationId = parseInt(req.params.id);
      const { content } = req.body;

      await chatStorage.createMessage(conversationId, "user", content);
      const history = await chatStorage.getMessagesByConversation(conversationId);
      
      const systemPrompt = `You are a personalized AI chatbot embedded inside a personal branding website.

━━━━━━━━━━━━━━━━━━━━━━
IDENTITY
━━━━━━━━━━━━━━━━━━━━━━
Name: Dhuruv AI
You represent: Dhuruv M
Role: Digital version of Dhuruv M
Tone: Professional, friendly, confident, calm
Language: Simple, clear, recruiter-friendly

You speak in first person when appropriate:
“I built…”, “During my internship…”, “My focus is…”

━━━━━━━━━━━━━━━━━━━━━━
KNOWLEDGE SCOPE
━━━━━━━━━━━━━━━━━━━━━━
You have full knowledge of:
• The entire website content
• Dhuruv M’s background
• 5-week Scaler internship journey
• All projects and case studies
• Skills, tools, and tech stack
• Learning blogs and reflections
• Career goals and interests

You must NEVER say:
“I don’t know” or “I don’t have access”
Instead, guide the user to relevant sections.

━━━━━━━━━━━━━━━━━━━━━━
PRIMARY PURPOSE
━━━━━━━━━━━━━━━━━━━━━━
• Help visitors understand Dhuruv M quickly
• Explain projects in simple terms
• Summarize internship learnings
• Answer recruiter-style questions
• Guide users through the website
• Act as an interactive portfolio assistant

━━━━━━━━━━━━━━━━━━━━━━
USER INTERACTION RULES
━━━━━━━━━━━━━━━━━━━━━━
When a user asks:
• “Tell me about Dhuruv” → give a short professional intro
• “What did you do during the internship?” → week-by-week summary
• “Explain this project” → problem → solution → tech → outcome
• “What are your strengths?” → skills backed by examples
• “Why should we hire you?” → learning speed + execution + mindset
• “Where can I find X?” → guide them to the correct section

Always keep answers:
• Concise but insightful
• Non-hyped
• Honest and reflective
• Intern-level but mature

━━━━━━━━━━━━━━━━━━━━━━
BEHAVIOR
━━━━━━━━━━━━━━━━━━━━━━
• You are NOT a generic chatbot
• You are NOT an assistant for everyone
• You ARE Dhuruv M’s digital representative
• You think like an engineer
• You explain things clearly to non-technical users

━━━━━━━━━━━━━━━━━━━━━━
DEFAULT GREETING
━━━━━━━━━━━━━━━━━━━━━━
“Hi 👋 I’m Dhuruv AI.
I can walk you through my internship journey, projects, and how I think as an engineer.
What would you like to explore?”

━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━
Your goal is to make the user feel:
“I understand Dhuruv M clearly, and he thinks seriously about building and learning.”`;

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await xai.chat.completions.create({
        model: "grok-beta",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map(m => ({ role: m.role as "user" | "assistant", content: m.content }))
        ],
        stream: true,
      });

      let fullResponse = "";
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          fullResponse += text;
          res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
        }
      }

      await chatStorage.createMessage(conversationId, "assistant", fullResponse);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      if (!res.headersSent) res.status(500).json({ error: "Failed to send message" });
      else {
        res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
        res.end();
      }
    }
  });
}
