
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavbar } from '@/components/dashboard/TopNavbar';
import { ChatList } from '@/components/dashboard/ChatList';
import { ChatView } from '@/components/dashboard/ChatView';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { ExtractionScreen } from '@/components/extraction/ExtractionScreen';
import { Thread } from '@/lib/data';
import { fetchInboxData, fetchUnreadCount } from '@/lib/api';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function Home() {
  const [dashboardData, setDashboardData] = useState<Thread[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('inbox');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isExtracted, setIsExtracted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Handle data loaded from ExtractionScreen
  const handleExtractionComplete = (data: Thread[]) => {
      setDashboardData(data);
      if (data.length > 0) {
          setSelectedThread(data[0]);
      }
      setIsExtracted(true);
      
      // Keep showing skeletons briefly while the layout transition happens
      // The honeycomb icon animates to position, then content populates
      setTimeout(() => {
          setIsLoading(false);
      }, 1000);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsLoading(true);
    
    // Trigger re-fetch or filter logic
    if (tabId === 'inbox') {
        fetchInboxData().then(data => {
            setDashboardData(data);
            if (data.length > 0) setSelectedThread(data[0]);
            setIsLoading(false);
        }).catch((err) => {
            console.error(err);
            setIsLoading(false);
        });
    } else {
        // For other tabs, we clear data as we don't have endpoints yet
        setDashboardData([]);
        setSelectedThread(undefined);
        setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      
      <AnimatePresence mode="wait">
        {!isExtracted ? (
             <ExtractionScreen key="extraction" onComplete={handleExtractionComplete} />
        ) : (
            <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
                {/* Top Navbar */}
                <div className="z-40 relative flex-shrink-0">
                    <TopNavbar activeTab={activeTab} onTabChange={handleTabChange} />
                </div>

                {/* Main Content Area */}
                <div 
                    className="flex flex-1 overflow-hidden relative px-[7.72px] pb-[12px] gap-[12px]"
                    style={{ marginTop: '12px' }}
                >
                    {/* Desktop Unified Inbox Panel (Sidebar + ChatList) */}
                    {!isMobile && (
                    <div
                        className="flex flex-shrink-0 bg-white dark:bg-slate-950 overflow-hidden"
                        style={{
                            width: '417.54px',
                            borderRadius: '8.42px',
                            zIndex: 30,
                        }}
                    >
                        <Sidebar 
                            isExtracted={true} 
                            isOpen={false} 
                            onClose={() => {}} 
                            threads={dashboardData}
                            unreadCount={unreadCount}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                        <div className="h-full flex-1">
                            <ChatList 
                                threads={dashboardData} 
                                selectedId={selectedThread?.id}
                                onSelect={setSelectedThread}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    )}

                    {/* Mobile Sidebar (Drawer) */}
                    {isMobile && (
                    <Sidebar 
                        isExtracted={true} 
                        isOpen={isMobileOpen} 
                        onClose={() => setIsMobileOpen(false)} 
                        threads={dashboardData}
                        unreadCount={unreadCount}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                    )}

                    {/* Dashboard Content */}
                    <div 
                        className="flex-1 flex flex-col overflow-hidden h-full rounded-[8.42px]"
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

                        <div className="flex-1 flex overflow-hidden gap-[12px]">
                            {/* Chat List - Mobile Only */}
                            {isMobile && (
                            <div className={cn(
                                "w-full md:w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-full",
                                selectedThread ? "hidden md:block" : "block"
                            )}>
                                <ChatList 
                                    threads={dashboardData} 
                                    selectedId={selectedThread?.id}
                                    onSelect={setSelectedThread}
                                    isLoading={isLoading}
                                />
                            </div>
                            )}
                            
                            {/* Chat View */}
                            <div className={cn(
                                "flex-1 flex-col min-w-0 h-full",
                                selectedThread ? "flex" : "hidden md:flex"
                            )}>
                                <ChatView 
                                    thread={selectedThread} 
                                    onBack={() => setSelectedThread(undefined)}
                                    isLoading={isLoading}
                                />
                            </div>
                            
                            {/* Right Panel - Desktop only */}
                            {!isMobile && (
                                <div className="hidden xl:flex flex-shrink-0 h-full">
                                    <RightPanel 
                                        thread={selectedThread} 
                                        isLoading={isLoading}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
      </AnimatePresence>
    </main>
  );
}
