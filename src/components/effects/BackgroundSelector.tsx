'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { ParticleBackground } from './ParticleBackground';
import { NoiseFlowBackground } from './NoiseFlowBackground';
import { MatrixBackground } from './MatrixBackground';
import { EnergyFieldBackground } from './EnergyFieldBackground';

type BackgroundType = 'particles' | 'blackhole' | 'energyfield' | 'noiseflow' | 'matrix';

const backgrounds = [
  {
    type: 'particles',
    label: 'Static Field',
    description: 'A static field of particles with subtle connections',
    Icon: Icons.sparkles
  },
  {
    type: 'blackhole',
    label: 'Black Hole',
    description: 'A magnetic field that attracts and disperses particles',
    Icon: Icons.atom
  },
  {
    type: 'energyfield',
    label: 'Energy Field',
    description: 'Dynamic energy lines with glowing effects',
    Icon: Icons.zap
  },
  {
    type: 'noiseflow',
    label: 'Noise Flow',
    description: 'Flowing particles guided by noise patterns',
    Icon: Icons.waves
  },
  {
    type: 'matrix',
    label: 'Matrix',
    description: 'Classic digital rain effect',
    Icon: Icons.terminal
  }
] as const;

export function BackgroundSelector() {
  const [selectedBackground, setSelectedBackground] = useState<BackgroundType>('particles');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.background-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const selectedBg = backgrounds.find(bg => bg.type === selectedBackground);

  return (
    <>
      {/* Render the selected background */}
      {selectedBackground === 'particles' && <ParticleBackground mode="static" />}
      {selectedBackground === 'blackhole' && <ParticleBackground mode="blackhole" />}
      {selectedBackground === 'energyfield' && <EnergyFieldBackground />}
      {selectedBackground === 'noiseflow' && <NoiseFlowBackground />}
      {selectedBackground === 'matrix' && <MatrixBackground />}

      {/* Background selector button */}
      <div className="background-selector fixed bottom-4 right-4 z-50">
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedBg?.Icon({ className: "w-4 h-4" })}
            <span className="text-sm">Background</span>
            {isOpen ? 
              <Icons.chevronUp className="w-4 h-4" /> : 
              <Icons.chevronDown className="w-4 h-4" />
            }
          </Button>

          {isOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border">
              <div className="p-2 space-y-1">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.type}
                    className={`w-full px-3 py-2 text-left rounded-md transition-colors
                      ${selectedBackground === bg.type ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    onClick={() => {
                      setSelectedBackground(bg.type as BackgroundType);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {bg.Icon({ className: "w-4 h-4" })}
                      <span className="font-medium">{bg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">{bg.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 