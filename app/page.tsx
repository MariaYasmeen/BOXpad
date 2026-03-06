'use client';

import { useState } from 'react';
import { ExtractionScreen } from '@/components/extraction/ExtractionScreen';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isExtracted, setIsExtracted] = useState(false);

  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden text-white">
      <AnimatePresence mode="wait">
        {!isExtracted && (
          <motion.div
            key="extraction-screen"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50"
          >
            <ExtractionScreen onComplete={() => setIsExtracted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Placeholder */}
      <div className={`transition-all duration-1000 absolute inset-0 flex flex-col ${isExtracted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-95'}`}>
         {/* Top Bar */}
         <header className="h-16 border-b border-slate-800 flex items-center px-6 justify-between bg-slate-900/50 backdrop-blur-sm">
            <div className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">BOXpad</div>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
                <div className="w-24 h-4 rounded bg-slate-700 animate-pulse" />
            </div>
         </header>

         <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900/30 p-4 flex flex-col gap-4">
                {/* Simulated Populated Sidebar Items */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 rounded bg-slate-800/50 animate-pulse" />
                ))}
            </aside>
            
            {/* Main Content */}
            <section className="flex-1 p-8">
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-4">
                        <div className="h-32 rounded-xl bg-slate-800/30 animate-pulse" />
                        <div className="h-64 rounded-xl bg-slate-800/30 animate-pulse" />
                    </div>
                    <div className="space-y-4">
                         <div className="h-full rounded-xl bg-slate-800/30 animate-pulse" />
                    </div>
                </div>
            </section>
         </div>
      </div>
    </main>
  );
}
