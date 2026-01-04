import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ExternalLink } from "lucide-react";
import heroImg from "@assets/IMG_20260104_192056-removebg-preview_1767537950249.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

export default function Home() {
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
    </div>
  );
}
