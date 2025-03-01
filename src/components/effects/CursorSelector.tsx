'use client';

import { Button } from '@/components/ui/Button';
import { useCursor } from '@/lib/providers/cursor-provider';
import { motion } from 'framer-motion';

// might implement to use later, but for now, just using a simple circle
const effects = [
  { id: 'none', label: 'None', emoji: '🚫' },
  { id: 'stream', label: 'Stream', emoji: '💫' },
  { id: 'sparks', label: 'Sparks', emoji: '✨' },
  { id: 'ripple', label: 'Ripple', emoji: '🌊' },
] as const;

export function CursorSelector() {
  const { effect, setEffect } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg z-50"
    >
      {effects.map((item) => (
        <Button
          key={item.id}
          variant={effect === item.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setEffect(item.id as any)}
          className="gap-1.5"
        >
          <span className="text-lg">{item.emoji}</span>
          <span className="text-sm font-medium">{item.label}</span>
        </Button>
      ))}
    </motion.div>
  );
} 