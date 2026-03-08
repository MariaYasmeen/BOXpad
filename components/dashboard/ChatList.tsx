
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
            Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 bg-white dark:bg-slate-950 border-b border-slate-50 dark:border-slate-900">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-3 w-8" />
                    </div>
                </div>
            ))
        ) : (
            filteredThreads.map((thread) => (
                <div
                    key={thread.id}
                    onClick={() => onSelect?.(thread)}
                    className={cn(
                        "cursor-pointer transition-colors p-3 bg-white dark:bg-slate-950 border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg",
                        selectedId === thread.id && "bg-slate-50 dark:bg-slate-900  "
                    )}
                >
                    <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                    {thread.user.avatar ? (
                                        <img src={thread.user.avatar} alt={thread.user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        thread.user.name.charAt(0)
                                    )}
                                </div>
                                {thread.unread && (
                                    <div className="absolute top-0 right-0 w-3 h-3  srounded-full border-2 border-white dark:border-slate-950" />
                                )}
                            </div>
                            <div>
                                <h3 className={cn(
                                    "font-semibold text-sm text-slate-900 dark:text-white",
                                    thread.unread && "font-bold"
                                )}>
                                    {thread.user.name}
                                </h3>
                                <p className={cn(
                                    "text-xs text-slate-500 truncate max-w-[120px]",
                                    thread.unread && "text-slate-900 dark:text-slate-300 font-medium"
                                )}>
                                    {thread.lastMessage}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{thread.timestamp}</span>
                            {thread.platform === 'linkedin' && (
                                <div className="bg-[#0077B5] p-1 rounded-sm">
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </div>
                            )}
                            {thread.platform === 'email' && (
                                <div className="bg-orange-500 p-1 rounded-sm">
                                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};
