
'use client';

import { useState, useEffect } from 'react';
import { ExtractionScreen } from '@/components/extraction/ExtractionScreen';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNavbar } from '@/components/dashboard/TopNavbar';
import { ChatList } from '@/components/dashboard/ChatList';
import { ChatView } from '@/components/dashboard/ChatView';
import { RightPanel } from '@/components/dashboard/RightPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { Thread } from '@/lib/data';
import { fetchInboxData, fetchUnreadCount } from '@/lib/api';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function Home() {
  const [isExtracted, setIsExtracted] = useState(false);
  const [dashboardData, setDashboardData] = useState<Thread[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('inbox');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const isPhone = useMediaQuery('(max-width: 768px)');
  const isOverlayMode = useMediaQuery('(max-width: 1279px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');

  useEffect(() => {
    // Automatically close right panel on mobile/tablet initially, open on desktop
    setIsRightPanelOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [threads, count] = await Promise.all([
          fetchInboxData(),
          fetchUnreadCount()
        ]);
        setDashboardData(threads);
        setUnreadCount(count);
        if (threads.length > 0) {
            setSelectedThread(threads[0]);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleExtractionComplete = (data: Thread[]) => {
      // Data is already loaded via useEffect, just enable the view
      setIsExtracted(true);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Trigger re-fetch or filter logic
    if (tabId === 'inbox') {
        setIsLoading(true);
        fetchInboxData().then(data => {
            setDashboardData(data);
            if (data.length > 0) setSelectedThread(data[0]);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    } else {
        // For other tabs, we clear data as we don't have endpoints yet
        setDashboardData([]);
        setSelectedThread(undefined);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* Extraction Screen Overlay */}
      <AnimatePresence>
        {!isExtracted && (
          <div
            key="extraction-screen"
            className="absolute inset-0 z-50 bg-slate-950 transition-all duration-800"
            style={{ opacity: 1 }}
          >
            <ExtractionScreen onComplete={handleExtractionComplete} />
          </div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Layout */}
      <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
         {/* Top Navbar */}
         <div className="z-40 relative">
            <TopNavbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange} 
                onMenuClick={() => setIsMobileOpen(true)}
            />
         </div>

         <div className="flex flex-1 overflow-hidden relative">
            {/* Desktop Unified Inbox Panel (Sidebar + ChatList) */}
            {!isMobile && (
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '7.72px',
                  width: '417.54px',
                  height: 'calc(100% - 20px)',
                  borderRadius: '8.42px',
                  display: 'flex',
                  zIndex: 30,
                  opacity: isExtracted ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              >
                <Sidebar 
                  isExtracted={isExtracted} 
                  isOpen={false} 
                  onClose={() => {}} 
                  threads={dashboardData}
                  unreadCount={unreadCount}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  isLoading={isLoading}
                />
                {isExtracted && (
                  <div className="h-full flex-1">
                    <ChatList 
                      threads={dashboardData} 
                      selectedId={selectedThread?.id}
                      onSelect={setSelectedThread}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Mobile Sidebar (Drawer) */}
            {isMobile && (
              <Sidebar 
                isExtracted={isExtracted} 
                isOpen={isMobileOpen} 
                onClose={() => setIsMobileOpen(false)} 
                threads={dashboardData}
                unreadCount={unreadCount}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isLoading={isLoading}
              />
            )}

            {/* Dashboard Content */}
            <div 
                className="flex-1 flex flex-col overflow-hidden"
                style={{
                    marginLeft: !isMobile ? '435px' : '0px',
                    opacity: isExtracted ? 1 : 0,
                    transition: 'opacity 0.8s ease-out 0.4s'
                }}
            >
              

                <div className="flex-1 flex overflow-hidden">
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
                        "flex-1 flex-col min-w-0 bg-white dark:bg-slate-950",
                        selectedThread ? "flex" : "hidden md:flex"
                    )}>
                        <ChatView 
                            thread={selectedThread} 
                            onBack={() => setSelectedThread(undefined)}
                            onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
                            isRightPanelOpen={isRightPanelOpen}
                        />
                    </div>
                    
                    {/* Right Panel - Desktop (Collapsible) */}
                    {!isOverlayMode && isRightPanelOpen && (
                        <div className="hidden xl:flex flex-shrink-0 h-full pr-4">
                            <RightPanel 
                                thread={selectedThread} 
                                isLoading={isLoading} 
                                onClose={() => setIsRightPanelOpen(false)}
                            />
                        </div>
                    )}

                    {/* Right Panel - Overlay (Mobile/Tablet/Small Laptop) */}
                    <AnimatePresence>
                        {isOverlayMode && isRightPanelOpen && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm"
                            >
                                <RightPanel 
                                    thread={selectedThread} 
                                    isLoading={isLoading} 
                                    onClose={() => setIsRightPanelOpen(false)}
                                    isOverlay={true}
                                    isPhone={isPhone}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
         </div>
      </div>
    </main>
  );
}
