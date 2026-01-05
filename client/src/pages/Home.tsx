import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowDown, ExternalLink, MessageCircle, X, Send, User } from "lucide-react";
import heroImg from "@assets/IMG_20260104_192056-removebg-preview_1767537950249.png";
import realEstateImg from "@assets/IMG_20260104_234323_434_1767606998595.jpg";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversation } = useQuery<any>({
    queryKey: ["/api/conversations", currentConversationId],
    enabled: !!currentConversationId,
  });

  const createConversation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/conversations", { title: "Dhuruv AI Chat" });
      return res.json();
    },
    onSuccess: (data) => {
      setCurrentConversationId(data.id);
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!currentConversationId) return;
      await apiRequest("POST", `/api/conversations/${currentConversationId}/messages`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations", currentConversationId] });
      setChatMessage("");
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    if (!currentConversationId) {
      createConversation.mutate();
    }
  };
  const heroRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const tl = gsap.timeline();
    tl.to(transitionRef.current, {
      scale: 1,
      opacity: 0,
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
        if (transitionRef.current) transitionRef.current.style.display = "none";
      }
    });

    tl.from(".hero-animate", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=0.5");

    tl.from(".journey-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".journey-title",
        start: "top 80%"
      }
    })
    .from(".journey-card", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".journey-card",
        start: "top 85%"
      }
    }, "-=0.4");

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div 
        ref={transitionRef} 
        className="fixed inset-0 z-[100] bg-primary flex items-center justify-center pointer-events-none"
        style={{ transform: "scale(1.5)" }}
      >
        <div className="w-24 h-24 bg-background rounded-full animate-pulse" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Hero Profile" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto mt-20">
          <h1 className="text-6xl md:text-9xl mb-6 leading-tight font-display font-medium overflow-hidden hero-animate">
            Dhuruv M
          </h1>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto mb-12 uppercase tracking-[0.2em] font-light hero-animate">
            Intern on Scaler 5 week internship challenge Showcase
          </p>
          <div className="flex flex-col items-center gap-4 button-container hero-animate">
            <Button variant="ghost" className="group flex items-center gap-2 no-default-hover-elevate">
              <div className="p-2 border rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowDown className="w-4 h-4" />
              </div>
              <span className="uppercase tracking-widest text-xs font-semibold">My Services</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Internship Journey Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl uppercase tracking-tighter mb-16 text-center journey-title">5-Week Internship Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { id: "W1", title: "Foundations", desc: "Understanding core fundamentals, problem decomposition, and planning before coding." },
            { id: "W2", title: "Problem Solving", desc: "Practicing logical problem solving and consistency through daily exercises." },
            { id: "W3", title: "Advanced Thinking", desc: "System-level thinking, trade-offs, and code readability for scalability." },
            { id: "W4", title: "Real-World Application", desc: "Applying learnings to a real project with design decisions and edge cases." },
            { id: "W5", title: "Reflection & Growth", desc: "Reviewing progress, identifying strengths, and reflecting on evolution." }
          ].map((week, index) => (
            <Card key={week.id} className="p-6 bg-secondary/30 border-border/50 hover-elevate group relative overflow-hidden h-full flex flex-col justify-between journey-card">
              <div className="relative z-10">
                <span className="text-primary font-mono text-xs mb-2 block font-bold">{week.id}</span>
                <h3 className="text-lg mb-3 uppercase tracking-wider font-bold group-hover:text-primary transition-colors">{week.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {week.desc}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="w-8 h-px bg-border group-hover:w-full group-hover:bg-primary transition-all duration-500" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Handwriting Notes Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
        <h2 className="text-3xl md:text-4xl uppercase tracking-tighter mb-12 text-center">Boring but Real Reflections</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
          {[
            { date: "Day 3", note: "Bhai, honestly coding is hard. Today I tried to break a big problem into small pieces like they said in W1. It felt slow but atleast I didn't get stuck for 3 hours on one error. Slowly understanding." },
            { date: "Day 12", note: "Week 2 is all about consistency. Sometimes I want to play games but I forced myself to solve 2 problems. My English is not good so explaining logic is difficult, but I am trying my best." },
            { date: "Day 20", note: "Thinking about 'trade-offs' now. In school we just want the answer, but here they ask 'why this way?'. Readability is important because tomorrow I will forget my own code haha." },
            { date: "Day 28", note: "Real projects are different from tutorials. Tutorials always work, but real code breaks in 100 places. Dealing with edge cases today. It's tiring but I like the challenge." },
            { date: "Day 35", note: "Last week. I'm not a pro yet, but I'm much better than Day 1. Confidence is slowly coming. Scaler challenge was tough but I didn't quit. That's a win for me." }
          ].map((note, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center">
              <Card className="p-8 bg-[#fdf6e3] dark:bg-[#2c2c2c] border-none shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="font-serif text-sm text-[#8b7d6b] dark:text-[#a0a0a0] mb-4 border-b border-[#8b7d6b]/20 pb-2">{note.date}</div>
                <p className="font-handwriting text-xl md:text-2xl text-[#2c2c2c] dark:text-[#e0e0e0] leading-relaxed opacity-90 italic">
                  "{note.note}"
                </p>
                <div className="mt-6 flex justify-end">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">- Dhuruv's Personal Log</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Assignment Work Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl uppercase tracking-tighter">Assignment Work</h2>
          <Button variant="ghost" className="uppercase tracking-widest text-xs no-default-hover-elevate">See All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "AI avatar introduction Video", category: "Video" },
            { title: "Real estate website", category: "Web Design", image: realEstateImg },
            { title: "Yt video", category: "Video" }
          ].map((project, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-muted mb-6 overflow-hidden rounded-sm relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground italic">
                    {project.title}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl uppercase tracking-tight">{project.title}</h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">{project.category}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Illusion Thanks Section */}
      <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] animate-pulse" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-6 font-display">Special Thanks</h2>
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs">To the pillars of my 5-week journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-secondary/20 border-white/5 backdrop-blur-xl group hover-elevate transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <div className="aspect-square mb-6 overflow-hidden rounded-full border-2 border-primary/20 p-2 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400" alt="Scaler" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-2xl text-center mb-4 tracking-tighter uppercase font-bold">Scaler</h3>
              <p className="text-center text-muted-foreground text-xs leading-relaxed uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                For the platform, the structure, and the challenge that pushed me to grow.
              </p>
            </Card>

            <Card className="p-8 bg-secondary/20 border-white/5 backdrop-blur-xl group hover-elevate transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] scale-110 z-20">
              <div className="aspect-square mb-6 overflow-hidden rounded-full border-2 border-primary/20 p-2 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400" alt="Host" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-2xl text-center mb-4 tracking-tighter uppercase font-bold">Our Host</h3>
              <p className="text-center text-muted-foreground text-xs leading-relaxed uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                For the guidance and the live energy that made every session meaningful.
              </p>
            </Card>

            <Card className="p-8 bg-secondary/20 border-white/5 backdrop-blur-xl group hover-elevate transition-all duration-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <div className="p-8 flex flex-col items-center justify-center h-full">
                <h3 className="text-2xl text-center mb-4 tracking-tighter uppercase font-bold">All Mentors</h3>
                <p className="text-center text-muted-foreground text-xs leading-relaxed uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity italic">
                  "Thank you to all the mentors for your incredible wisdom and live session guidance. Your support made this 5-week journey possible."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Chatbot Toggle */}
      <Button
        size="icon"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl z-50 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        onClick={handleOpenChat}
      >
        <MessageCircle className="w-8 h-8 text-primary-foreground" />
      </Button>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg h-[600px] flex flex-col relative shadow-2xl border-border/50 overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">C</div>
                <div>
                  <h3 className="font-bold text-sm">Chatbot</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Always Active</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setIsChatOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4 bg-background/50" ref={scrollRef}>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center text-[10px] text-primary-foreground font-bold">C</div>
                  <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                    Hi 👋 I'm your Chatbot. I can walk you through my internship journey, projects, and how I think as an engineer. What would you like to explore?
                  </div>
                </div>

                {conversation?.messages?.map((msg: any) => (
                  <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}>
                    <div className={cn(
                      "w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold",
                      msg.role === "user" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                    )}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : "C"}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm max-w-[80%]",
                      msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary/50 rounded-tl-none"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-secondary/30">
              <form 
                className="flex gap-2" 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chatMessage.trim()) sendMessage.mutate(chatMessage);
                }}
              >
                <Input
                  placeholder="Ask me anything..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="bg-background border-border/50 h-10"
                />
                <Button size="icon" type="submit" disabled={sendMessage.isPending || !chatMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
