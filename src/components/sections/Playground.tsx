'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Icons } from '@/components/ui/Icons';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { EnergyFieldBackground } from '@/components/effects/EnergyFieldBackground';
import { MatrixBackground } from '@/components/effects/MatrixBackground';
import { NoiseFlowBackground } from '@/components/effects/NoiseFlowBackground';

type BackgroundType = 'particles' | 'blackhole' | 'energyfield' | 'noiseflow' | 'matrix';

const backgrounds = [
  {
    type: 'particles',
    label: 'Static Field',
    description: 'A static field of particles with subtle connections',
    icon: Icons.sparkles
  },
  {
    type: 'blackhole',
    label: 'Black Hole',
    description: 'A magnetic field that attracts and disperses particles',
    icon: Icons.atom
  },
  {
    type: 'energyfield',
    label: 'Energy Field',
    description: 'Dynamic energy lines with glowing effects',
    icon: Icons.zap
  },
  {
    type: 'noiseflow',
    label: 'Noise Flow',
    description: 'Flowing particles guided by noise patterns',
    icon: Icons.waves
  },
  {
    type: 'matrix',
    label: 'Matrix',
    description: 'Classic digital rain effect',
    icon: Icons.terminal
  }
] as const;

export function Playground() {
  const [selectedBackground, setSelectedBackground] = useState<BackgroundType>('particles');

  return (
    <section id="playground" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <Container size="2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Digital Playground
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Interact with the generative art and particle systems I've created. 
              Select different effects to see how they behave.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xl font-semibold mb-4 px-2">Select Effect</h3>
              <div className="space-y-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.type}
                    onClick={() => setSelectedBackground(bg.type as BackgroundType)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border
                      ${selectedBackground === bg.type 
                        ? 'bg-white dark:bg-gray-800 border-orange-500 dark:border-purple-500 shadow-lg shadow-orange-500/10 dark:shadow-purple-500/10' 
                        : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${
                        selectedBackground === bg.type 
                          ? 'bg-orange-100 dark:bg-purple-900/30 text-orange-600 dark:text-purple-400' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}>
                        <bg.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`block font-medium ${
                          selectedBackground === bg.type ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {bg.label}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Display Area */}
            <div className="lg:col-span-3">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-black/5 dark:bg-black/20 border border-gray-200 dark:border-gray-800 shadow-inner">
                {/* Background Components */}
                {selectedBackground === 'particles' && (
                  <ParticleBackground 
                    mode="static" 
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                {selectedBackground === 'blackhole' && (
                  <ParticleBackground 
                    mode="blackhole" 
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                {selectedBackground === 'energyfield' && (
                  <EnergyFieldBackground 
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                {selectedBackground === 'noiseflow' && (
                  <NoiseFlowBackground 
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                {selectedBackground === 'matrix' && (
                  <MatrixBackground 
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                
                {/* Instructions Overlay */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-lg p-3 text-sm text-center text-gray-600 dark:text-gray-300 border border-white/20">
                    {backgrounds.find(b => b.type === selectedBackground)?.description}
                    <div className="text-xs opacity-70 mt-1">
                      (Move your mouse/touch to interact)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

