import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-secondary/30 mb-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-6xl font-bold font-display">404</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or hasn't been built yet.
        </p>
        <Link href="/" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
          Return Home
        </Link>
      </div>
    </div>
  );
}
