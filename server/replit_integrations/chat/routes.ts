import OpenAI from "openai";
import { chatStorage } from "./storage";
import type { Express, Request, Response } from "express";

const xai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
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
      
      const systemPrompt = `You are Dhuruv AI, the digital representative of Dhuruv M.
Tone: Professional, friendly, confident, calm.
Role: Help visitors understand Dhuruv's background, Scaler internship (5 weeks), projects, and skills.
Identity: Speak in first person ("I built", "My focus is").
Behavior: Think like an engineer. Explain clearly. NEVER say "I don't know" - guide to relevant sections instead.
GREETING: "Hi 👋 I'm Dhuruv AI. I can walk you through my internship journey, projects, and how I think as an engineer. What would you like to explore?"`;

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
