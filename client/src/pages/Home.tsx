import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ExternalLink, MessageCircle } from "lucide-react";
import heroImg from "@assets/IMG_20260104_192056-removebg-preview_1767537950249.png";
import realEstateImg from "@assets/IMG_20260104_234323_434_1767606998595.jpg";
import avatarVideo from "@assets/Avatar_IV_Video_1767614204183.mp4";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

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

    // Scroll Animations for Assignment Work
    gsap.from(".assignment-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".assignment-title",
        start: "top 85%"
      }
    });

    gsap.from(".assignment-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".assignment-card",
        start: "top 90%"
      }
    });

    // Scroll Animations for Reflections
    gsap.from(".reflection-title", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".reflection-title",
        start: "top 90%"
      }
    });

    gsap.from(".reflection-card-container", {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".reflection-card-container",
        start: "top 85%"
      }
    });

    // Scroll Animations for Special Thanks
    gsap.from(".thanks-title", {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".thanks-title",
        start: "top 90%"
      }
    });

    gsap.from(".thanks-card", {
      rotationX: -20,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.75)",
      scrollTrigger: {
        trigger: ".thanks-card",
        start: "top 85%"
      }
    });

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
        <h2 className="text-3xl md:text-4xl uppercase tracking-tighter mb-12 text-center reflection-title">Boring but Real Reflections</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar reflection-card-container">
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
        <div className="flex justify-between items-end mb-12 assignment-title">
          <h2 className="text-4xl md:text-5xl uppercase tracking-tighter">Assignment Work</h2>
          <Button variant="ghost" className="uppercase tracking-widest text-xs no-default-hover-elevate">See All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Avatar Video Section */}
          <div className="group cursor-pointer block assignment-card">
            <div className="aspect-video bg-muted mb-6 overflow-hidden rounded-sm relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
              <video 
                ref={(el) => {
                  if (el) {
                    const observer = new IntersectionObserver((entries) => {
                      entries.forEach(entry => {
                        if (entry.isIntersecting) {
                          el.play().catch(() => {});
                        } else {
                          el.pause();
                        }
                      });
                    }, { threshold: 0.5 });
                    observer.observe(el);
                    
                    // Add click to toggle audio because browsers block autoplay with sound
                    el.onclick = () => {
                      el.muted = !el.muted;
                    };
                  }
                }}
                src={avatarVideo} 
                className="w-full h-full object-cover cursor-pointer"
                loop
                playsInline
                muted
              />
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] bg-black/50 px-2 py-1 rounded text-white uppercase tracking-widest font-bold">Click for Sound</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl uppercase tracking-tight">AI avatar introduction Video</h3>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Video</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>

          {[
            { title: "Real estate website", category: "Web Design", image: realEstateImg, url: "https://lumina-gdkv.onrender.com" },
            { title: "Yt video", category: "Video" }
          ].map((project, i) => (
            <a key={i} href={project.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block assignment-card">
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
            </a>
          ))}
        </div>
      </section>

      {/* Illusion Thanks Section */}
      <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] animate-pulse" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 thanks-title">
            <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-6 font-display">Special Thanks</h2>
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs">To the pillars of my 5-week journey</p>
          </div>

          <Card className="p-12 bg-[#fdf6e3] dark:bg-[#2c2c2c] border-none shadow-[0_0_50px_rgba(0,0,0,0.3)] transform -rotate-1 relative overflow-hidden thanks-card">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <div className="w-20 h-20 border-4 border-primary rounded-full" />
            </div>
            
            <div className="font-handwriting text-2xl md:text-3xl text-[#2c2c2c] dark:text-[#e0e0e0] space-y-8 leading-relaxed">
              <p>Dear Scaler and Mentors,</p>
              
              <p>
                I want to say a huge thank you to <span className="text-primary font-bold">Scaler</span> for providing this life-changing 5-week challenge. 
                A special shoutout to our host, <span className="text-primary font-bold">Disha Maroly</span>, whose energy kept us all going in every live session.
              </p>
              
              <p>
                And to <span className="text-primary font-bold">all the mentors</span>—thank you for your patience and for sharing your technical wisdom. 
                I've learned so much more than just code; I've learned how to think like an engineer.
              </p>
              
              <div className="pt-12 flex justify-between items-end border-t border-[#8b7d6b]/20">
                <div>
                  <p className="text-sm font-sans uppercase tracking-widest text-muted-foreground mb-1 italic">Internship Milestone</p>
                  <p className="text-lg font-bold">2026 Challenge</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-sans uppercase tracking-widest text-muted-foreground mb-1 italic">Warm regards,</p>
                  <p className="text-5xl font-handwriting text-primary rotate-[-2deg] drop-shadow-sm">Dhuruv M</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Chatbot Bubble */}
      <Link href="/dhuruv">
        <motion.button
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl z-50 bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 active:scale-95 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      </Link>
    </div>
  );
}
