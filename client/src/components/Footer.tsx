import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border mt-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="text-lg font-bold font-display text-white">Scaler Internship Portfolio</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Documenting my 5-week journey from student to engineering mindset.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 text-center md:text-left">
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Built with React, Tailwind & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
