import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const { scrollY } = useScroll();
  const ringScale = useTransform(scrollY, [0, 500], [1, 1.5]);
  const ringOpacity = useTransform(scrollY, [0, 500], [0.5, 0]);

  return (
    <section className="pt-24 md:pt-40 pb-16 md:pb-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative mb-12 flex justify-center items-center w-32 h-32">
          {/* Pulsating Ring */}
          <motion.div 
            style={{ scale: ringScale, opacity: ringOpacity }}
            className="absolute inset-0 rounded-full border-2 border-accent/40 pointer-events-none"
          />
          
          <img 
            src="/profile.jpg" 
            alt="Vivek" 
            className="w-32 h-32 object-cover rounded-full border-2 border-white/10 shadow-2xl shadow-black cursor-pointer grayscale hover:grayscale-0 transition-all duration-700 ease-out z-10 relative"
          />
          
          <motion.div 
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-strawhat rounded-full border-4 border-background z-20 cursor-pointer pointer-events-auto"
            animate={{ 
              scale: [1, 1.2, 1], 
              boxShadow: ["0 0 0px #F4D03F", "0 0 20px #F4D03F", "0 0 0px #F4D03F"] 
            }}
            whileHover={{ scale: 1.3, boxShadow: "0 0 30px #F4D03F" }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 font-display leading-[1.1] md:leading-[0.9]">
          Hi, I'm <span className="text-primary">Vivek</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-secondary max-w-2xl leading-relaxed mb-12 font-light px-4">
          Building <span className="text-primary font-medium">agentic, AI-native products</span> while mentoring a <span className="text-primary font-medium">global community</span> of learners and engineers.
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            textShadow: ["0 0 5px rgba(255,140,0,0)", "0 0 10px rgba(255,140,0,0.2)", "0 0 5px rgba(255,140,0,0)"]
          }}
          transition={{ 
            opacity: { delay: 0.5 },
            textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex items-center justify-center gap-3 px-6 py-3 rounded-full glass text-[10px] md:text-xs font-mono text-secondary uppercase tracking-[0.2em] md:tracking-[0.3em] max-w-[95vw] sm:max-w-none"
        >
          <span className="shrink-0 w-2 h-2 rounded-full bg-strawhat shadow-[0_0_10px_#F4D03F]" />
          <span className="drop-shadow-[0_0_10px_rgba(255,140,0,0.15)] leading-tight text-center">
            Currently <span className="text-primary font-bold">IDLE</span> — Monitoring for high-impact challenges.
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
