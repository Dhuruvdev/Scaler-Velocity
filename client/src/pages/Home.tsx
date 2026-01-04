import { motion } from "framer-motion";
import { Link } from "wouter";
import { Section } from "@/components/Section";
import { ArrowRight, Code2, Database, Terminal, Cpu, Download } from "lucide-react";
import { useTimeline } from "@/hooks/use-timeline";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";

export default function Home() {
  const { data: timeline } = useTimeline();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 grid-bg opacity-30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Scaler School Internship 2025
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6"
          >
            I build things <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              that actually work.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Scaler Intern & Aspiring Software Engineer. <br/>
            I document my learning, build real projects, and obsess over code quality.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all flex items-center justify-center gap-2">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#journey" className="w-full sm:w-auto px-8 py-4 bg-white/5 text-foreground border border-white/10 font-medium rounded-full hover:bg-white/10 transition-all">
              Track Progress
            </a>
          </motion.div>
        </div>
      </section>

      {/* Internship Journey */}
      <Section id="journey" title="5 Weeks of Growth" subtitle="From fundamentals to deployment. Here's how I evolved week by week.">
        <div className="relative border-l border-primary/20 ml-4 md:ml-0 md:pl-0 space-y-12">
          {timeline?.map((item, index) => (
            <div key={item.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
              
              <div className="glass-card p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    Week {item.week}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground uppercase tracking-widest font-mono">Focus: {item.focus}</span>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {item.content}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.learnings?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Showcase */}
      <Section id="projects" title="Featured Projects" subtitle="Real problems. Real solutions. Production-grade code.">
        <div className="space-y-20 md:space-y-32">
          {projects?.map((project, index) => (
            <div key={project.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>
              <div className="w-full md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                    {/* Placeholder for project image or actual image */}
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <Terminal className="w-16 h-16 text-muted-foreground/20" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-bold mb-4 font-display">{project.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {project.shortDescription}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="text-sm font-bold uppercase text-primary mb-1">The Problem</h4>
                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-primary mb-1">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack?.map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground border border-border font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={`/projects/${project.slug}`} className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Read Case Study
                  </Link>
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="px-6 py-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Evidence-Based Skills */}
      <Section id="skills" title="Technical Arsenal" subtitle="I don't just know these tools. I build with them daily.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills?.map((skill) => (
            <div key={skill.id} className="p-6 bg-secondary/30 border border-white/5 rounded-xl hover:bg-secondary/50 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{skill.name}</h4>
                <div className="p-2 rounded-lg bg-background border border-border">
                  {skill.category === 'frontend' && <Code2 className="w-4 h-4 text-blue-400" />}
                  {skill.category === 'backend' && <Database className="w-4 h-4 text-green-400" />}
                  {skill.category === 'tools' && <Terminal className="w-4 h-4 text-orange-400" />}
                  {skill.category === 'core' && <Cpu className="w-4 h-4 text-purple-400" />}
                </div>
              </div>
              <p className="text-sm text-muted-foreground border-l-2 border-primary/50 pl-3">
                {skill.evidence}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* About & Contact */}
      <Section id="contact" className="mb-20">
        <div className="bg-gradient-to-br from-secondary/50 to-background border border-border rounded-3xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">Ready to ship?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            I'm looking for opportunities to apply my engineering mindset to real-world problems. 
            Currently available for full-time roles or extended internships.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:hello@example.com" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
              Start a Conversation
            </a>
            <button className="w-full sm:w-auto px-8 py-4 bg-background border border-border font-medium rounded-xl hover:border-primary/50 transition-all flex items-center justify-center gap-2 group">
              <Download className="w-4 h-4 group-hover:text-primary transition-colors" /> Download Resume
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
