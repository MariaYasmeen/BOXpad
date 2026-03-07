
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Users, Bot, Workflow, Megaphone, Settings, Search, ChevronDown, User, MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { honeycombs } from '@/components/extraction/ExtractionScreen';
import { useMediaQuery } from '@/hooks/use-media-query';

interface SidebarProps {
  isExtracted: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isExtracted, isOpen, onClose }: SidebarProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Mock Users Data
  const users = [
    { name: 'Sarah Williams', count: 2 },
    { name: 'Michael Johnson', count: 11, active: true },
    { name: 'Emily Davis', count: 0 },
    { name: 'Christopher Miller', count: 4 },
    { name: 'Amanda Garcia', count: 5 },
    { name: 'Joshua Martinez', count: 0 },
    { name: 'Ashley Taylor', count: 1 },
    { name: 'Daniel Anderson', count: 0 },
    { name: 'Jessica Thomas', count: 2 },
  ];

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
        initial={isMobile ? { x: "-100%" } : { width: 0, opacity: 0 }}
        animate={
          isMobile 
            ? { x: isOpen ? "0%" : "-100%" }
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
            <span className="font-bold text-xl dark:text-white">Inbox</span>
          </div>
          {isMobile && (
            <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>

      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-6">
         {/* Main Navigation */}
         <div className="space-y-1">
            {/* <div className="text-xs font-semibold text-slate-400 px-3 mb-2 uppercase tracking-wider">Dashboard</div> */}
            <motion.button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
                <User className="w-4 h-4" />
                <span>My Inbox</span>
            </motion.button>
            <motion.button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
                <Users className="w-4 h-4" />
                <span>All</span>
                <span className="ml-auto text-xs text-slate-400">28</span>
            </motion.button>
            <motion.button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
                <div className="w-4 h-4 border-2 border-slate-400 rounded-full border-dashed" />
                <span>Unassigned</span>
                <span className="ml-auto text-xs text-slate-400">5</span>
            </motion.button>
         </div>

         {/* Teams Section */}
         <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                <div className="text-sm font-medium">Teams</div>
                <ChevronDown className="w-3 h-3" />
            </div>
            {[{name: 'Sales', count: 7}, {name: 'Customer Support', count: 16}].map((team) => (
                <button key={team.name} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border border-slate-300" />
                    </div>
                    <span>{team.name}</span>
                    <span className="ml-auto text-xs text-slate-400">{team.count}</span>
                </button>
            ))}
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
            {users.map((user) => (
                <button 
                    key={user.name} 
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        user.active 
                            ? "bg-white shadow-sm border border-slate-100" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                >
                    <div className="w-4 h-4 flex items-center justify-center">
                         <div className="w-4 h-4 bg-slate-200 rounded-full flex items-center justify-center text-[8px] text-slate-500 font-bold">
                            <User className="w-3 h-3 text-slate-400" />
                         </div>
                    </div>
                    <span className="truncate">{user.name}</span>
                    {user.count > 0 && (
                        <span className="ml-auto text-xs text-slate-400">{user.count}</span>
                    )}
                </button>
            ))}
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
