
'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowDownUp } from 'lucide-react';
import { MOCK_THREADS, Thread } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChatListProps {
  threads?: Thread[];
  selectedId?: number;
  onSelect?: (thread: Thread) => void;
}

export const ChatList = ({ threads = MOCK_THREADS, selectedId, onSelect }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const displayThreads = threads.length > 0 ? threads : MOCK_THREADS;

  const filteredThreads = displayThreads.filter(thread => 
    thread.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
        <h2 className="font-semibold text-lg dark:text-slate-200">Inbox</h2>
        <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
                <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search Chat" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-slate-200"
            />
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-slate-500 px-1">
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                <span>Open</span>
                <ArrowDownUp className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                <span>Newest</span>
                <ArrowDownUp className="w-3 h-3" />
            </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredThreads.map((thread) => (
            <motion.div
                key={thread.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelect?.(thread)}
                className={cn(
                    "p-4 cursor-pointer border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors relative group",
                    selectedId === thread.id && "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500"
                )}
            >
                <div className="flex items-start gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0",
                        selectedId === thread.id ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-slate-300 dark:bg-slate-700"
                    )}>
                        {thread.user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className={cn("font-medium text-sm truncate", selectedId === thread.id ? "text-blue-700 dark:text-blue-400" : "text-slate-900 dark:text-slate-200")}>
                                {thread.user.name}
                            </h3>
                            <span className="text-xs text-slate-400">{thread.timestamp}</span>
                        </div>
                        <p className={cn("text-xs truncate mb-2", selectedId === thread.id ? "text-slate-600 dark:text-slate-300" : "text-slate-500")}>
                            {thread.lastMessage}
                        </p>
                        
                        <div className="flex items-center gap-2">
                            {thread.tags?.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                    {tag}
                                </span>
                            ))}
                            {thread.unreadCount > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                    {thread.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};
