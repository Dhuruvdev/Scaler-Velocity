import { Link } from "wouter";
import { SiLinkedin, SiInstagram, SiDiscord } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-display lowercase tracking-tighter text-white">
            Dhuruv M<span className="text-primary">.</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6 text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            <SiLinkedin className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <SiInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <SiDiscord className="w-5 h-5" />
          </a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
          © 2026 Arik. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}