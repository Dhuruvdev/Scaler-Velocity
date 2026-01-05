import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Send, User, Sparkles, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Dhuruv() {
  const [chatMessage, setChatMessage] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversation } = useQuery<any>({
    queryKey: ["/api/conversations", currentConversationId],
    enabled: !!currentConversationId,
  });

  const { data: allConversations } = useQuery<any[]>({
    queryKey: ["/api/conversations"],
  });

  const createConversation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/conversations", { title: "Dhuruv Chat" });
      return res.json();
    },
    onSuccess: (data) => {
      setCurrentConversationId(data.id);
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  useEffect(() => {
    if (!currentConversationId && allConversations && allConversations.length > 0) {
      setCurrentConversationId(allConversations[0].id);
    } else if (!currentConversationId && allConversations && allConversations.length === 0) {
      createConversation.mutate();
    }
  }, [allConversations]);

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!currentConversationId) return;
      
      const messageContent = content.trim();
      if (!messageContent) return;

      setChatMessage("");
      
      const response = await fetch(`/api/conversations/${currentConversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: messageContent }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.error) {
                console.error("Chat Error:", data.error);
                throw new Error(data.error);
              }
            } catch (e) {}
          }
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations", currentConversationId] });
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto h-[80vh] flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border/50 shadow-2xl bg-secondary/10 backdrop-blur-sm">
        {/* Sidebar */}
        <div className="hidden md:flex w-72 bg-secondary/30 border-r border-border/50 flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">Dhuruv AI</span>
          </div>
          
          <Button 
            variant="outline" 
            className="justify-start gap-3 mb-8 h-12 rounded-xl no-default-hover-elevate border-border/50 hover:bg-secondary/50"
            onClick={() => createConversation.mutate()}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            New Session
          </Button>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-black">History</p>
            <div className="space-y-2">
              {allConversations?.map((conv) => (
                <div 
                  key={conv.id}
                  onClick={() => setCurrentConversationId(conv.id)}
                  className={cn(
                    "p-4 rounded-xl text-xs truncate cursor-pointer transition-all duration-200 border",
                    currentConversationId === conv.id 
                      ? "bg-primary/10 border-primary/20 text-primary font-bold shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {conv.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-background/50 relative">
          <header className="p-6 border-b flex justify-between items-center bg-background/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <Bot className="w-7 h-7" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Dhuruv</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Online Presence</p>
                </div>
              </div>
            </div>
          </header>

          <ScrollArea className="flex-1 p-6 md:p-10" ref={scrollRef}>
            <div className="max-w-3xl mx-auto space-y-10 pb-12">
              {!conversation?.messages?.length && !sendMessage.isPending && (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-2 rotate-3 shadow-inner">
                    <Bot className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black font-display tracking-tight">Kese ho bhai?</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
                      I'm Dhuruv's AI shadow. Ask me about his projects, internship at Scaler, or anything basically.
                    </p>
                  </div>
                </div>
              )}

              {conversation?.messages?.map((msg: any) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={cn("flex gap-4 md:gap-6", msg.role === "user" ? "flex-row-reverse" : "")}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-md",
                    msg.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                  )}>
                    {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div className={cn(
                    "flex-1 max-w-[85%] md:max-w-[80%] space-y-2",
                    msg.role === "user" ? "text-right" : ""
                  )}>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black px-1 opacity-50">
                      {msg.role === "user" ? "Bhai" : "Dhuruv"}
                    </p>
                    <div className={cn(
                      "p-5 rounded-2xl text-sm leading-relaxed shadow-sm border",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none ml-auto border-primary/20" 
                        : "bg-secondary/20 rounded-tl-none mr-auto border-border/50"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {sendMessage.isPending && (
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full shrink-0 bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black px-1 opacity-50">Dhuruv</p>
                    <div className="p-5 rounded-2xl bg-secondary/20 rounded-tl-none mr-auto border border-border/50 max-w-[100px] flex justify-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 md:p-10 border-t bg-background/80 backdrop-blur-md">
            <form 
              className="max-w-3xl mx-auto relative" 
              onSubmit={(e) => {
                e.preventDefault();
                if (chatMessage.trim()) sendMessage.mutate(chatMessage);
              }}
            >
              <Input
                placeholder="Dhuruv se kuch pucho..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="bg-secondary/20 border-border/50 h-16 pl-8 pr-16 rounded-2xl text-base focus-visible:ring-primary/20 shadow-inner"
              />
              <Button 
                size="icon" 
                type="submit" 
                className="absolute right-3 top-3 h-10 w-10 rounded-xl bg-primary hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                disabled={sendMessage.isPending || !chatMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-[10px] text-center mt-4 text-muted-foreground uppercase tracking-widest font-bold opacity-50">
              Dhuruv AI representation • Built for Scaler Challenge
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
