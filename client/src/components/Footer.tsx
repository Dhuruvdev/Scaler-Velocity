import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-display lowercase tracking-tighter text-white">
            arik<span className="text-primary">.</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Behance</a>
          <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
          © 2026 Arik. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}