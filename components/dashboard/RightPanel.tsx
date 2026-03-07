
'use client';

import { User, Mail, Phone, Clock, PlusCircle, ChevronDown, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Thread } from '@/lib/data';

interface RightPanelProps {
  thread?: Thread;
}

export const RightPanel = ({ thread }: RightPanelProps) => {
  if (!thread) {
    return (
        <div 
            className="flex flex-col items-center justify-center text-slate-400 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800"
            style={{
                width: '294.03509521484375px',
                height: '609.8245849609375px',
                borderRadius: '8.42px',
                opacity: 1,
            }}
        >
            <User className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm text-center">Select a conversation</p>
        </div>
    );
  }

  const names = thread.user.name.split(' ');
  const firstName = names[0];
  const lastName = names.slice(1).join(' ');

  return (
    <div 
        className="flex flex-col bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 overflow-y-auto no-scrollbar font-sans"
        style={{
            width: '294.03509521484375px',
            height: '609.8245849609375px',
            borderRadius: '8.42px',
            gap: '7.02px',
            opacity: 1,
        }}
    >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 mb-2">
             <h3 className="font-bold text-base text-slate-900 dark:text-white">Details</h3>
             <div className="w-4 h-4 text-slate-400 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
             </div>
        </div>

        {/* Chat Data Section */}
        <div 
            className="px-4 flex flex-col justify-center"
            style={{
                width: '294.03509521484375px',
                height: '101.0526351928711px',
                paddingBottom: '5.61px',
                borderBottomWidth: '0.7px',
                borderBottomColor: '#D8DEE4',
                borderBottomStyle: 'solid'
            }}
        >
            <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Chat Data</span>
                <ChevronDown className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Assignee</span>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px]">
                            {firstName.charAt(0)}{lastName.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{firstName} {lastName}</span>
                    </div>
                </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Team</span>
                    <div className="flex items-center gap-2">
                         <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px]">
                            <User className="w-3 h-3" />
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">Sales Team</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Contact Data Section */}
        <div 
            className="px-4 flex flex-col justify-center"
            style={{
                width: '294.03509521484375px',
                height: '189.4736785888672px',
                paddingBottom: '5.61px',
                borderBottomWidth: '0.7px',
                borderBottomColor: '#D8DEE4',
                borderBottomStyle: 'solid'
            }}
        >
             <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Contact Data</span>
                <ChevronDown className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">First Name</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{firstName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Last Name</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{lastName}</span>
                </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Phone number</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{thread.user.phone || '+1 (312) 555-0134'}</span>
                </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Email</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200 truncate max-w-[150px]">{thread.user.email}</span>
                </div>
                 <div className="mt-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white cursor-pointer">See all</span>
                 </div>
            </div>
        </div>

        {/* Contact Labels Section */}
         <div 
            className="px-4 flex flex-col justify-center"
            style={{
                width: '294.03509521484375px',
                height: '65.96491241455078px',
                paddingBottom: '5.61px',
                borderBottomWidth: '0.7px',
                borderBottomColor: '#D8DEE4',
                borderBottomStyle: 'solid'
            }}
        >
            <div className="flex items-center justify-between mb-2 cursor-pointer">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Contact Labels</span>
                <ChevronDown className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded-full border border-blue-500 bg-white text-blue-500 text-[10px] font-bold flex items-center gap-1">
                    <div className="w-3 h-3 text-blue-500 fill-blue-500">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    </div>
                    Closed Won
                </span>
                <span className="px-2 py-0.5 rounded-full border border-blue-500 bg-white text-blue-500 text-[10px] font-bold flex items-center gap-1">
                    <div className="w-3 h-3 text-blue-500 fill-blue-500">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    </div>
                    Chicago
                </span>
                <button className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center text-blue-500">
                    <PlusCircle className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Notes Section */}
        <div 
            className="px-4 flex flex-col justify-center"
            style={{
                width: '294.03509521484375px',
                height: '101.0526351928711px',
                paddingBottom: '5.61px',
                borderBottomWidth: '0.7px',
                borderBottomColor: '#D8DEE4',
                borderBottomStyle: 'solid'
            }}
        >
            <div className="flex items-center justify-between mb-2 cursor-pointer">
                 <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Notes</span>
                 <ChevronDown className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            </div>
            <div className="space-y-2">
                 <div className="bg-[#F6E9A0]/50 p-2 rounded text-[10px] text-slate-500 font-medium">
                    Add a note
                </div>
                {thread.notes ? (
                    <div className="bg-[#F6E9A0] p-2 rounded text-[10px] font-bold text-slate-800">
                        {thread.notes}
                    </div>
                ) : (
                    <div className="bg-[#F6E9A0] p-2 rounded text-[10px] font-bold text-slate-800">
                        Strong potential for future upgrades
                    </div>
                )}
            </div>
        </div>

        {/* Other Chats Section */}
        <div 
             className="px-4 flex flex-col justify-center"
             style={{
                width: '294.03509521484375px',
                height: '82.94737243652344px',
                paddingBottom: '5.61px',
                borderBottomWidth: '0.7px',
                borderBottomColor: '#D8DEE4',
                borderBottomStyle: 'solid'
             }}
        >
             <div className="flex items-center justify-between mb-2 cursor-pointer">
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Other Chats</span>
                <ChevronDown className="w-4 h-4 text-slate-900 dark:text-slate-100" />
             </div>
             
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                     <Instagram className="w-8 h-8 text-[#FE3265]" />
                 </div>
                 <div className="flex-1 min-w-0">
                     <div className="text-sm font-bold text-slate-900 dark:text-white">Fit4Life</div>
                     <div className="text-xs text-slate-400">On my way!</div>
                 </div>
                 <div className="ml-auto text-[10px] text-slate-300 font-medium">08/08/25</div>
             </div>
        </div>

    </div>
  );
};
