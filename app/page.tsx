
'use client';

import { useState } from 'react';
import { ExtractionScreen } from '@/components/extraction/ExtractionScreen';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavbar } from '@/components/dashboard/TopNavbar';
import { ChatList } from '@/components/dashboard/ChatList';
import { ChatView } from '@/components/dashboard/ChatView';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { Thread } from '@/lib/data';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isExtracted, setIsExtracted] = useState(false);
  const [dashboardData, setDashboardData] = useState<Thread[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | undefined>(undefined);

  const handleExtractionComplete = (data: Thread[]) => {
      setDashboardData(data);
      if (data.length > 0) {
          setSelectedThread(data[0]);
      }
      setIsExtracted(true);
  };

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* Extraction Screen Overlay */}
      <AnimatePresence>
        {!isExtracted && (
          <motion.div
            key="extraction-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 bg-slate-950"
          >
            <ExtractionScreen onComplete={handleExtractionComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Layout */}
      <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
         {/* Top Navbar */}
         <div className="z-40 relative">
            <TopNavbar />
         </div>

         <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar with Shared Layout Animation */}
            <Sidebar isExtracted={isExtracted} isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

            {/* Dashboard Content - Fades in after extraction */}
            <motion.div 
                className="flex-1 flex flex-col overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isExtracted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
                {/* Mobile Header (Hidden on Desktop) */}
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
                    {/* Chat List - Hidden on mobile if thread selected */}
                    <div className={cn(
                        "w-full md:w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-full",
                         selectedThread ? "hidden md:block" : "block"
                    )}>
                        <ChatList 
                            threads={dashboardData} 
                            selectedId={selectedThread?.id}
                            onSelect={setSelectedThread}
                        />
                    </div>
                    
                    {/* Chat View - Hidden on mobile if no thread selected */}
                    <div className={cn(
                        "flex-1 flex-col min-w-0 bg-white dark:bg-slate-950 h-full",
                        selectedThread ? "flex" : "hidden md:flex"
                    )}>
                        <ChatView 
                            thread={selectedThread} 
                            onBack={() => setSelectedThread(undefined)}
                        />
                    </div>
                    
                    {/* Right Panel - Desktop only */}
                    <div className="hidden xl:flex w-72 flex-shrink-0 border-l border-slate-200 dark:border-slate-800">
                        <RightPanel thread={selectedThread} />
                    </div>
                </div>
             </motion.div>
         </div>
      </div>
    </main>
  );
}
