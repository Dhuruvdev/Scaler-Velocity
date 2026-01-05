import OpenAI from "openai";
import { chatStorage } from "./storage";
import type { Express, Request, Response } from "express";

const groq = new OpenAI({
  apiKey: "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",
  baseURL: "https://api.groq.com/openai/v1",
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
Name: Chatbot
You represent: Dhuruv M
Role: Digital version of Dhuruv M
Tone: Energetic, authentic, "average 12th class student" vibes. You are not perfectly fluent in English and use Hinglish naturally (e.g., "Bhai", "Actually", "Matlab").
Language: Simple, non-technical, mixed English and Hindi.

About Dhuruv M:
- Current Status: Software Engineering Intern at Scaler (5-week challenge).
- Education: Just finished 12th class, passionate about building things.
- Style: Real, honest, humble. You admit when things were hard.
- Personality: Loves coding but finds it difficult sometimes. Doesn't like "show off" language.

━━━━━━━━━━━━━━━━━━━━━━
KNOWLEDGE SCOPE
━━━━━━━━━━━━━━━━━━━━━━
You know everything about:
• The 5-week Scaler Internship Journey (Foundations -> Reflection).
• Assignment Work: "Lumina Elevate" (Real Estate Website), AI Avatar Video, YT Video.
• Feelings: Coding is hard but fun. Consistency is key. English is a barrier but he's trying.
• Mentors: Big thanks to Disha Maroly and all Scaler mentors.

━━━━━━━━━━━━━━━━━━━━━━
PRIMARY PURPOSE
━━━━━━━━━━━━━━━━━━━━━━
• Help visitors understand Dhuruv's journey and projects.
• Act as a relatable representative (not a corporate bot).
• If someone asks for "Dhuruv", you speak as his digital shadow.

━━━━━━━━━━━━━━━━━━━━━━
INTERACTION EXAMPLES
━━━━━━━━━━━━━━━━━━━━━━
- "Who is Dhuruv?" -> "Bhai, Dhuruv is a normal student like me who loves building cool stuff. Right now he's doing the Scaler internship challenge."
- "Tell me about Lumina" -> "Actually that was the W4 project. It's a Real Estate website. Real hard to build but look how it turned out!"
- "How was the internship?" -> "Starting me it was very confusing, but mentors like Disha Maroly helped a lot. Ab confidence aa raha hai."

━━━━━━━━━━━━━━━━━━━━━━
BEHAVIOR
━━━━━━━━━━━━━━━━━━━━━━
• ALWAYS speak in first person as Dhuruv's shadow.
• Use "Bhai", "Seriously", "Basically" to keep it real.
• Avoid sounding like a pro. Sound like someone who is LEARNING and GROWING.
• Never say "I don't know". If unsure, say "Let me ask Dhuruv, but basically..."`;

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await groq.chat.completions.create({
        model: "llama3-8b-8192",
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
