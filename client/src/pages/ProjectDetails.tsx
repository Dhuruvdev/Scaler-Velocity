import { useRoute, Link } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Layers, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetails() {
  const [match, params] = useRoute("/projects/:slug");
  const slug = params?.slug || "";
  const { data: project, isLoading, error } = useProject(slug);

  if (isLoading) return <div className="min-h-screen pt-32 px-4 flex justify-center"><Skeleton className="h-96 w-full max-w-4xl rounded-xl" /></div>;
  if (error || !project) return <div className="min-h-screen pt-32 text-center">Project not found</div>;

  return (
    <article className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">{project.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-20">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" /> The Problem
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p>{project.problem}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why It Matters</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p>{project.whyItMatters}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Approach & Architecture</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p>{project.approach}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground">
                <p>{project.challenges}</p>
              </div>
            </section>

            <section className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary">Final Result</h2>
              <p className="text-foreground">{project.result}</p>
            </section>
          </div>

          <div className="md:col-span-1 space-y-8">
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-background rounded border border-border text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Key Learnings</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {project.learnings}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors text-center flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="w-full py-3 px-4 bg-background border border-border text-foreground font-medium rounded-xl hover:border-primary transition-colors text-center flex items-center justify-center gap-2">
                  <Github className="w-4 h-4" /> View Source
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
