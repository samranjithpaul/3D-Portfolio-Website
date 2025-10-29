import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "3D Portfolio Website",
    description: "An immersive portfolio experience with Three.js integration and smooth animations",
    tech: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping platform with real-time inventory and payment processing",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "AI Chat Application",
    description: "Real-time messaging app with AI-powered responses and natural language processing",
    tech: ["React", "Python", "FastAPI", "WebSocket"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for analyzing complex datasets with beautiful charts",
    tech: ["Vue.js", "D3.js", "PostgreSQL", "Express"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-orange-500 to-red-500",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-primary mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  animate={{
                    rotateY: hoveredIndex === index ? 5 : 0,
                    rotateX: hoveredIndex === index ? 5 : 0,
                    scale: hoveredIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="glass p-6 rounded-2xl hover:shadow-glow-purple transition-all h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full glass text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/50 hover:bg-primary/10"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-primary hover:shadow-glow-cyan"
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
