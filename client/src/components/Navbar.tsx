import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="flex items-center gap-2 px-6 py-2 bg-secondary/80 backdrop-blur-md border border-border/50 rounded-full pointer-events-auto shadow-xl">
        <Link href="/" className="text-xl font-display lowercase tracking-tighter mr-4 text-white">
          Dhuruv M<span className="text-primary">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 mr-6">
          {["Services", "Work", "About", "Blog", "Pages"].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`}
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-bold transition-colors",
                location === `/${item.toLowerCase()}` ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item}
            </Link>
          ))}
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold px-4 rounded-full h-8">
          Let's Talk
        </Button>
      </div>
    </nav>
  );
}
