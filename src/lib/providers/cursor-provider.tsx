'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type CursorEffect = 'stream' | 'sparks' | 'ripple' | 'none';

interface CursorContextType {
  effect: CursorEffect;
  setEffect: (effect: CursorEffect) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [effect, setEffect] = useState<CursorEffect>('none');

  useEffect(() => {
    // Get initial effect from localStorage
    const storedEffect = localStorage.getItem('cursorEffect') as CursorEffect;
    if (storedEffect) {
      setEffect(storedEffect);
    }
  }, []);

  const handleSetEffect = (newEffect: CursorEffect) => {
    setEffect(newEffect);
    localStorage.setItem('cursorEffect', newEffect);
  };

  return (
    <CursorContext.Provider value={{ effect, setEffect: handleSetEffect }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
} 