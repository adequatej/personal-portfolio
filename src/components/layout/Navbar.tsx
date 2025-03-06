"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';
import { Icons } from '../ui/Icons';
import Link from 'next/link';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      
      // Find which section is currently in view
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section "active" when it's top is within the viewport
          // with some offset for the navbar height
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(current || '');
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-500 dark:to-indigo-600 bg-clip-text text-transparent"
          >
            JG
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2 py-1 rounded-md transition-all duration-300 
                  ${activeSection === item.href.substring(1) 
                    ? 'text-orange-500 dark:text-purple-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-300'} 
                  hover:text-orange-600 dark:hover:text-purple-300
                  active:scale-95 hover:bg-orange-50 dark:hover:bg-purple-900/20`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.span 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-400 dark:to-indigo-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                active:scale-95 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <Icons.close className="w-6 h-6" />
              ) : (
                <Icons.menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <Container>
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded-md transition-all duration-300
                      ${activeSection === item.href.substring(1)
                        ? 'bg-orange-50 dark:bg-purple-900/20 text-orange-500 dark:text-purple-400 font-medium'
                        : 'text-gray-600 dark:text-gray-300'}
                      hover:bg-orange-50 dark:hover:bg-purple-900/10
                      hover:text-orange-600 dark:hover:text-purple-300
                      active:scale-98`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
