import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  delay?: number;
}

export function Section({ id, className, children, title, subtitle, delay = 0 }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto", className)}>
      {(title || subtitle) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
          className="mb-12 md:mb-16"
        >
          {title && <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">{subtitle}</p>}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
