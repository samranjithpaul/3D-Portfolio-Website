import { motion, useInView } from "framer-motion";
import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const skills = [
  { name: "React", category: "Frontend", level: 95 },
  { name: "TypeScript", category: "Frontend", level: 90 },
  { name: "Three.js", category: "Frontend", level: 85 },
  { name: "Tailwind CSS", category: "Frontend", level: 95 },
  { name: "Node.js", category: "Backend", level: 85 },
  { name: "Python", category: "Backend", level: 80 },
  { name: "PostgreSQL", category: "Backend", level: 80 },
  { name: "MongoDB", category: "Backend", level: 75 },
  { name: "Figma", category: "Design", level: 90 },
  { name: "Framer Motion", category: "Design", level: 85 },
  { name: "Git", category: "Tools", level: 90 },
  { name: "Docker", category: "Tools", level: 75 },
];

const SkillIcon3D = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          emissive="#00f0ff" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
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
              My <span className="gradient-text">Skills</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-primary mx-auto"
            />
          </div>

          {/* 3D Floating Icons Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[300px] mb-12 rounded-2xl glass overflow-hidden"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Suspense fallback={null}>
                <SkillIcon3D />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Skills by Category */}
          <div className="space-y-12">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + catIndex * 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-primary">{category}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="glass p-6 rounded-xl hover:shadow-glow-cyan transition-all group"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-medium">{skill.name}</span>
                          <span className="text-sm text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                            className="h-full bg-gradient-primary relative"
                          >
                            <div className="absolute inset-0 bg-gradient-primary opacity-50 blur-sm" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
