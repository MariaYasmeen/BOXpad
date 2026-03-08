
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronDown, User, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Skeleton } from '@/components/ui/skeleton';

import { Thread, MENU_ITEMS } from '@/lib/data';
import { NavButton } from './NavButton';

interface SidebarProps {
  isExtracted: boolean;
  isOpen: boolean;
  onClose: () => void;
  threads?: Thread[];
  unreadCount?: number;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  isLoading?: boolean;
}

export const Sidebar = ({ isExtracted, isOpen, onClose, threads = [], unreadCount = 0, activeTab = 'inbox', onTabChange, isLoading = false }: SidebarProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');


  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={isMobile ? { x: "-100%", width: "280px", opacity: 1 } : { width: 0, opacity: 0 }}
        animate={
          isMobile 
            ? { x: isOpen ? "0%" : "-100%", width: "280px", opacity: 1 }
            : { width: isExtracted ? '168.42px' : 0, opacity: isExtracted ? 1 : 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col overflow-hidden whitespace-nowrap",
          isMobile ? "fixed inset-y-0 left-0 z-50 w-[280px]" : "relative"
        )}
        style={!isMobile ? {
            height: '609.82px',
            borderTopLeftRadius: '11.23px',
            borderBottomLeftRadius: '11.23px',
            borderBottomWidth: '0.7px'
        } : {}}
      >
        <div 
            className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900"
            style={!isMobile ? {
                width: '168.42px',
                height: '42.11px',
                gap: '7.02px',
                paddingTop: '5.61px',
                paddingRight: '11.23px',
                paddingBottom: '5.61px',
                paddingLeft: '11.23px'
            } : { padding: '1rem' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl dark:text-white">
                {MENU_ITEMS.find(i => i.id === activeTab)?.label || 'Inbox'}
            </span>
          </div>
          {isMobile && (
            <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-2 no-scrollbar">
         
         {/* Mobile Navigation */}
         {isMobile && (
             <div className="space-y-1 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                 {MENU_ITEMS.map((item) => (
                     <NavButton
                         key={item.id}
                         label={item.label}
                         icon={item.icon}
                         isActive={item.id === activeTab}
                         onClick={() => {
                             onTabChange?.(item.id);
                             onClose();
                         }}
                         variant="sidebar"
                     />
                 ))}
             </div>
         )}
         {/* Main Navigation */}
         <div 
            className="space-y-1"
            style={!isMobile ? {
                width: '154.39px',
                // height: '85.61px', // Removing fixed height to allow flexible content
                gap: '8.42px',
                display: 'flex',
                flexDirection: 'column'
            } : {}}
         >
            {isLoading ? (
                <>
                    <div className="flex items-center px-3 py-1.5 gap-2">
                        <Skeleton className="w-4 h-4 rounded-md" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="flex items-center px-3 py-1.5 gap-2">
                         <Skeleton className="w-4 h-4 rounded-md" />
                         <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center px-3 py-1.5 gap-2">
                         <Skeleton className="w-4 h-4 rounded-full" />
                         <Skeleton className="h-3 w-24" />
                    </div>
                </>
            ) : (
                <>
                    {/* <div className="text-xs font-semibold text-slate-400 px-3 mb-2 uppercase tracking-wider">Dashboard</div> */}
                    <motion.button
                        className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs font-normal transition-colors text-black dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        style={!isMobile ? { gap: '5.61px' } : { gap: '12px' }}
                    >
                        <div style={!isMobile ? { width: '14px', height: '14px' } : { width: '16px', height: '16px' }}>
                            <User className="w-full h-full fill-black" />
                        </div>
                        <span className="flex-1 truncate text-left" style={!isMobile ? { height: '13px', lineHeight: '13px', display: 'flex', alignItems: 'center' } : {}}>My Inbox</span>
                    </motion.button>
                    <motion.button
                        className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs font-normal transition-colors text-black dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        style={!isMobile ? { gap: '5.61px' } : { gap: '12px' }}
                    >
                        <div style={!isMobile ? { width: '14px', height: '14px' } : { width: '16px', height: '16px' }}>
                            <Users className="w-full h-full fill-black" />
                        </div>
                        <span className="flex-1 truncate text-left" style={!isMobile ? { height: '13px', lineHeight: '13px', display: 'flex', alignItems: 'center' } : {}}>All</span>
                        {unreadCount > 0 && <span className="ml-auto text-xs text-black">{unreadCount}</span>}
                    </motion.button>
                    <motion.button
                        className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs font-normal transition-colors text-black dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        style={!isMobile ? { gap: '5.61px' } : { gap: '12px' }}
                    >
                        <div 
                            className="border-2 border-black rounded-full border-dashed flex items-center justify-center"
                            style={!isMobile ? { width: '14px', height: '14px' } : { width: '16px', height: '16px' }}
                        />
                        <span className="flex-1 truncate text-left" style={!isMobile ? { height: '13px', lineHeight: '13px', display: 'flex', alignItems: 'center' } : {}}>Unassigned</span>
                        {/* <span className="ml-auto text-xs text-black">5</span> */}
                    </motion.button>
                </>
            )}
         </div>

         
         {/* Users Section */}
         <div 
            className="space-y-1"
            style={!isMobile ? {
                width: '154.39px',
                height: '262.46px',
                gap: '2.81px'
            } : {}}
         >
            <div className="flex items-center justify-between px-3 mb-2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                <div className="text-sm font-medium">Users</div>
                <ChevronDown className="w-3 h-3" />
            </div>
            {isLoading ? (
                <>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2">
                            <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    ))}
                </>
            ) : (
                threads.map((thread) => (
                    <button 
                        key={thread.id} 
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-normal transition-colors",
                            "text-black dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        )}
                    >
                        <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center text-[8px] text-black font-bold overflow-hidden">
                                {thread.user.avatar.startsWith('http') ? (
                                    <Image src={thread.user.avatar} alt={thread.user.name} width={16} height={16} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-3 h-3 text-black fill-black" />
                                )}
                            </div>
                        </div>
                        <span className="truncate">{thread.user.name}</span>
                        {thread.unreadCount > 0 && (
                            <span className="ml-auto text-xs text-black">{thread.unreadCount}</span>
                        )}
                    </button>
                ))
            )}
         </div>

         {/* Channels */}
         <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                <div className="text-sm font-medium">Channels</div>
                <ChevronDown className="w-3 h-3" />
            </div>
         </div>
      </div>
    </motion.aside>
    </>
  );
};
