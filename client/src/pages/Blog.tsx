import { usePosts } from "@/hooks/use-posts";
import { Link } from "wouter";
import { Section } from "@/components/Section";
import { format } from "date-fns";
import { ArrowRight, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <Section title="Engineering Log" subtitle="Thoughts, learnings, and technical deep dives from my internship journey.">
        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-2xl bg-secondary/30" />)}
          </div>
        ) : (
          <div className="grid gap-8">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="w-24 h-24 text-primary" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-mono">
                      <span>{post.createdAt && format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      <span>Software Engineering</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground max-w-3xl mb-6 line-clamp-2">
                      {post.summary}
                    </p>
                    
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Read full post <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
