
'use client';

import { useState } from 'react';
import { ExtractionScreen } from '@/components/extraction/ExtractionScreen';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ChatList } from '@/components/dashboard/ChatList';
import { ChatView } from '@/components/dashboard/ChatView';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { Thread } from '@/lib/data';
import { Menu } from 'lucide-react';

export default function Home() {
  const [isExtracted, setIsExtracted] = useState(false);
  const [dashboardData, setDashboardData] = useState<Thread[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleExtractionComplete = (data: Thread[]) => {
      setDashboardData(data);
      setIsExtracted(true);
  };

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* Extraction / Loading Overlay */}
      <AnimatePresence mode="wait">
        {!isExtracted && (
          <motion.div
            key="extraction-screen"
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50"
          >
            <ExtractionScreen onComplete={handleExtractionComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Layout */}
      <div className="flex h-screen overflow-hidden bg-white dark:bg-slate-950">
         {/* Sidebar with Shared Layout Animation */}
         <Sidebar isExtracted={isExtracted} isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

         {/* Dashboard Content - Fades in after extraction */}
         <motion.div 
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isExtracted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
         >
            {/* Mobile Header */}
            <div className="lg:hidden h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 justify-between bg-white dark:bg-slate-950 shrink-0">
               <div className="flex items-center gap-2">
                 <button onClick={() => setIsMobileOpen(true)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <Menu className="w-6 h-6" />
                 </button>
                 <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">BOXpad</div>
               </div>
               <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-full md:w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800">
                    <ChatList threads={dashboardData} />
                </div>
                <div className="hidden md:flex flex-1 flex-col min-w-0">
                    <ChatView />
                </div>
                <div className="hidden xl:flex w-72 flex-shrink-0 border-l border-slate-200 dark:border-slate-800">
                    <RightPanel />
                </div>
            </div>
         </motion.div>
      </div>
    </main>
  );
}
