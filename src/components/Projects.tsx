import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ChevronDown, ChevronUp, Info, X, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectModal from './ProjectModal';
import { Project } from '../types';

interface ProjectsProps {
  filter: string | null;
  onClearFilter: () => void;
  onSelectProject: (project: Project) => void;
}

export default function Projects({ filter, onClearFilter, onSelectProject }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!filter) return PROJECTS;
    return PROJECTS.filter(p => p.domain === filter);
  }, [filter]);

  const displayedProjects = showAll || filter ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="py-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex items-center justify-between mb-16"
      >
        <div className="flex items-center gap-4 lg:gap-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-display text-primary">Proof of Work</h2>
          {filter && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onClearFilter}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-mono text-accent uppercase tracking-widest hover:bg-accent/20 transition-all"
            >
              <X className="w-3 h-3" />
              {filter}
            </motion.button>
          )}
        </div>
        <span className="text-[10px] font-mono text-secondary/40 uppercase tracking-[0.4em]">01 / Projects</span>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group block p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] glass hover:bg-white/[0.08] transition-all duration-700 relative overflow-hidden haki-glow border-transparent ${
                project.domain === 'Systems Engineering' ? 'systems-glow' : 
                project.domain === 'Artificial Intelligence' ? 'ai-glow' : 'fullstack-glow'
              }`}
            >
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold font-display group-hover:text-primary transition-colors mr-2">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-[10px] font-mono px-3 py-1 rounded-full border transition-colors ${
                          project.domain === 'Systems Engineering' ? 'bg-accent/10 border-accent/20 text-accent' : 
                          project.domain === 'Artificial Intelligence' ? 'bg-kyubi/10 border-kyubi/20 text-kyubi' : 'bg-primary/5 border-primary/10 text-primary/80'
                        }`}>
                          {project.domain}
                        </span>
                        {project.subdomain && (
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full border bg-white/5 border-white/5 text-secondary/70 transition-colors">
                            {project.subdomain}
                          </span>
                        )}
                        {project.tech.slice(0, 1).map(t => (
                          <span key={t} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-base md:text-lg text-secondary/80 leading-[1.6] md:leading-[1.8] tracking-wide mb-8 group-hover:text-primary/90 transition-colors font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-secondary/60 group-hover:border-accent/30 group-hover:text-primary transition-all">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 justify-center">
                    <motion.button
                      onClick={() => onSelectProject(project)}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-xs md:text-sm font-bold text-primary hover:border-accent/40 transition-all group/btn shadow-xl"
                    >
                      <Info className="w-4 h-4 text-accent" />
                      View Details
                    </motion.button>
                    
                    <div className="flex gap-3">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all shadow-lg text-xs md:text-sm ${
                          project.isGithubOnly 
                            ? 'bg-white/5 border border-white/10 text-secondary hover:text-primary hover:border-white/20' 
                            : 'bg-primary text-background hover:bg-accent hover:text-white shadow-primary/10'
                        }`}
                      >
                        <span className="whitespace-nowrap">{project.isGithubOnly ? 'GitHub' : (project.linkLabel || 'Live')}</span>
                        {project.isGithubOnly ? <Github className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </motion.a>

                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-secondary hover:text-primary hover:border-white/20 transition-all shadow-xl"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-4 h-4 md:w-5 md:h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!filter && (
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 text-sm font-bold text-secondary hover:text-primary hover:bg-white/5 transition-all group tracking-widest uppercase"
          >
            {showAll ? (
              <>
                Collapse <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                Expand All Projects <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Modal moved to App.tsx for better stacking */}
    </section>
  );
}
