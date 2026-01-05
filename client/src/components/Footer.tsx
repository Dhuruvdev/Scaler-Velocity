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
          <a href="https://www.linkedin.com/in/dhuruv-m-790b06281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <SiLinkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/falooda.ly?igsh=am02ZnhvejR3Mmll" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <SiInstagram className="w-5 h-5" />
          </a>
          <a href="https://discord.com/users/1354287041772392478" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <SiDiscord className="w-5 h-5" />
          </a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
          © 2026 Dhuruv M. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}