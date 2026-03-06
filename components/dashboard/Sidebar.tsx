
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
            : { width: isExtracted ? 280 : 0, opacity: isExtracted ? 1 : 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col overflow-hidden whitespace-nowrap",
          isMobile ? "fixed inset-y-0 left-0 z-50 w-[280px]" : "relative"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                B
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">BOXpad</span>
          </div>
          {isMobile && (
            <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
         {/* Main Navigation */}
         <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400 px-3 mb-2 uppercase tracking-wider">Dashboard</div>
            {honeycombs.map((item) => (
                <motion.button
                    key={item.id}
                    layoutId={`honeycomb-${item.id}`} // Shared layout transition
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        item.id === 'inbox' 
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.id === 'inbox' && (
                        <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs py-0.5 px-2 rounded-full">
                            28
                        </span>
                    )}
                </motion.button>
            ))}
         </div>

         {/* Teams Section */}
         <div className="space-y-1">
            <div className="flex items-center justify-between px-3 mb-2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                <div className="text-xs font-semibold uppercase tracking-wider">Teams</div>
                <ChevronDown className="w-3 h-3" />
            </div>
            {['Sales', 'Customer Support', 'Engineering'].map((team) => (
                <button key={team} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
                    <div className="w-2 h-2 rounded-full border border-slate-400" />
                    <span>{team}</span>
                </button>
            ))}
         </div>
         
         {/* Channels */}
         <div className="space-y-1">
             <div className="flex items-center justify-between px-3 mb-2 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                <div className="text-xs font-semibold uppercase tracking-wider">Channels</div>
                <ChevronDown className="w-3 h-3" />
            </div>
             <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
                 <MessageSquare className="w-4 h-4 text-green-500" />
                 <span>WhatsApp</span>
             </button>
             <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
                 <MessageSquare className="w-4 h-4 text-pink-500" />
                 <span>Instagram</span>
             </button>
         </div>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-900">
        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-left flex-1 overflow-hidden">
                <div className="text-sm font-medium truncate dark:text-slate-200">Michael Johnson</div>
                <div className="text-xs text-slate-500 truncate">michael@boxpad.ai</div>
            </div>
            <Settings className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </motion.aside>
    </>
  );
};
