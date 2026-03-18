import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, Linkedin, Github } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

interface HeaderProps {
  onOpenPalette: () => void;
}

export default function Header({ onOpenPalette }: HeaderProps) {
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]);
  const headerBackdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const headerBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["20px 40px", "12px 32px"]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ 
          backgroundColor: headerBg, 
          backdropFilter: headerBackdropBlur,
          borderColor: headerBorder,
          padding: headerPadding
        }}
        className="w-full rounded-3xl flex items-center justify-between shadow-2xl shadow-black/50 border transition-all"
      >
        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenPalette}
            className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-secondary hover:text-primary hover:border-accent/50 transition-all uppercase tracking-widest group"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
            <span className="hidden xs:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ml-2 opacity-50">⌘K</kbd>
          </button>
        </div>
        
        <nav className="flex items-center gap-4 sm:gap-6 md:gap-10">
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-all relative group flex items-center justify-center p-2"
              whileHover={{ y: -2 }}
              aria-label={link.label}
            >
              {link.label === 'LinkedIn' ? <Linkedin className="w-4 h-4" /> : <Github className="w-4 h-4" />}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
