import { useRoute, Link } from "wouter";
import { usePost } from "@/hooks/use-posts";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) return <div className="min-h-screen pt-32 px-4 flex justify-center"><Skeleton className="h-96 w-full max-w-3xl rounded-xl" /></div>;
  if (error || !post) return <div className="min-h-screen pt-32 text-center">Post not found</div>;

  return (
    <article className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to log
      </Link>

      <header className="mb-12 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-secondary text-sm font-mono text-muted-foreground mb-6">
           {post.createdAt && format(new Date(post.createdAt), "MMMM d, yyyy")}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {post.summary}
        </p>
      </header>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
