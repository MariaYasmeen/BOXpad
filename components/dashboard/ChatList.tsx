
'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowDownUp } from 'lucide-react';
import { Thread, CURRENT_USER } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatListProps {
  threads?: Thread[];
  selectedId?: number;
  onSelect?: (thread: Thread) => void;
  isLoading?: boolean;
}

export const ChatList = ({ threads = [], selectedId, onSelect, isLoading = false }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const displayThreads = threads;

  const filteredThreads = displayThreads.filter(thread => 
    thread.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
        className="w-full h-full flex flex-col bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
        style={!isMobile ? {
            width: '249.12px',
            height: '609.82px',
            borderTopRightRadius: '8.42px',
            borderBottomRightRadius: '8.42px',
            borderLeftWidth: '0.7px'
        } : {}}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-slate-800 rounded flex items-center justify-center">
                 <div className="w-3 h-3 bg-slate-800 dark:bg-white" /> 
            </div>
            <h2 className="font-bold text-sm dark:text-slate-200">{CURRENT_USER.name}</h2>
        </div>
        <button className="text-slate-500 hover:text-slate-700">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
             </svg>
        </button>
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
                className="w-full pl-9 pr-4 py-2 bg-transparent border-none text-sm focus:outline-none dark:text-slate-200"
            />
            <div className="absolute right-3 top-2.5">
                 <Filter className="w-4 h-4 text-slate-400" />
            </div>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-slate-500 px-1 font-medium">
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                <span className="text-slate-900 dark:text-white font-bold">Open</span>
                <ArrowDownUp className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
                <span className="text-slate-900 dark:text-white font-bold">Newest</span>
                <ArrowDownUp className="w-3 h-3" />
            </div>
        </div>
      </div>

      {/* List */}
      <div 
        className="flex-1 overflow-y-auto no-scrollbar"
        style={!isMobile ? {
            width: '249.12px',
            height: '488.42px', // Explicit height from spec
            gap: '2.81px',
            paddingTop: '5.61px',
            paddingRight: '8.42px',
            paddingBottom: '5.61px',
            paddingLeft: '8.42px',
            display: 'flex',
            flexDirection: 'column'
        } : {}}
      >
        {isLoading ? (
            // Skeleton Loading State
            Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl border border-transparent bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex justify-between items-baseline">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-2 w-8" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                        </div>
                    </div>
                </div>
            ))
        ) : (
            filteredThreads.map((thread) => (
                <div
                    key={thread.id}
                    onClick={() => onSelect?.(thread)}
                    className={cn(
                        "p-3 cursor-pointer rounded-xl border border-transparent transition-all relative group hover:shadow-sm",
                        selectedId === thread.id 
                            ? "bg-white shadow-sm border-slate-100" 
                            : "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-50 dark:border-slate-800"
                    )}
                >
                    <div className="flex items-start gap-3">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden",
                            selectedId === thread.id ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600"
                        )}>
                            {thread.user.avatar.startsWith('http') ? (
                                <img src={thread.user.avatar} alt={thread.user.name} className="w-full h-full object-cover" />
                            ) : (
                                thread.user.name.charAt(0)
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-200 truncate">
                                    {thread.user.name}
                                </h3>
                                <span className="text-[10px] text-slate-400 font-medium">{thread.timestamp}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                                {thread.lastMessage}
                            </p>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
