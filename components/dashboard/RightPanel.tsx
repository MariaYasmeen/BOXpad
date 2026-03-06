
'use client';

import { User, Mail, Phone, Clock, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Thread } from '@/lib/data';

interface RightPanelProps {
  thread?: Thread;
}

export const RightPanel = ({ thread }: RightPanelProps) => {
  if (!thread) {
    return (
        <div className="w-72 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 flex flex-col items-center justify-center text-slate-400">
            <User className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm text-center">Select a conversation to view details</p>
        </div>
    );
  }

  const names = thread.user.name.split(' ');
  const firstName = names[0];
  const lastName = names.slice(1).join(' ');

  return (
    <div className="w-72 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 flex flex-col h-full overflow-y-auto">
        {/* Details Header */}
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Details</h3>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <PlusCircle className="w-4 h-4" />
            </button>
        </div>

        {/* Chat Data */}
        <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Assignee</span>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">JW</div>
                    <span className="font-medium dark:text-slate-200">James West</span>
                </div>
            </div>
             <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Team</span>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">S</div>
                    <span className="font-medium dark:text-slate-200">Sales Team</span>
                </div>
            </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800 mb-6" />

        {/* Contact Data */}
        <div className="mb-6">
            <h4 className="font-semibold text-sm mb-4 dark:text-slate-200">Contact Data</h4>
            <div className="space-y-4">
                <div className="space-y-1">
                    <span className="text-xs text-slate-400 block">First Name</span>
                    <span className="text-sm font-medium dark:text-slate-200">{firstName}</span>
                </div>
                <div className="space-y-1">
                    <span className="text-xs text-slate-400 block">Last Name</span>
                    <span className="text-sm font-medium dark:text-slate-200">{lastName}</span>
                </div>
                 <div className="space-y-1">
                    <span className="text-xs text-slate-400 block">Phone number</span>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Phone className="w-3 h-3" />
                        <span className="text-sm font-medium">{thread.user.phone || '+1 (312) 555-0134'}</span>
                    </div>
                </div>
                 <div className="space-y-1">
                    <span className="text-xs text-slate-400 block">Email</span>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Mail className="w-3 h-3" />
                        <span className="text-sm font-medium truncate">{thread.user.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`}</span>
                    </div>
                </div>
            </div>
            <button className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">See all</button>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800 mb-6" />

        {/* Labels */}
         <div className="mb-6">
            <h4 className="font-semibold text-sm mb-4 dark:text-slate-200">Contact Labels</h4>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Closed Won
                </span>
                 <span className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1">
                    Chicago
                </span>
                <button className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-colors">
                    <PlusCircle className="w-4 h-4" />
                </button>
            </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800 mb-6" />

        {/* Notes */}
        <div>
            <div className="flex items-center justify-between mb-4">
                 <h4 className="font-semibold text-sm dark:text-slate-200">Notes</h4>
                 <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/50 p-3 rounded-lg mb-2">
                <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">Add a note</p>
            </div>
             <div className="bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-900/60 p-3 rounded-lg">
                <p className="text-xs text-yellow-900 dark:text-yellow-100">Strong potential for future upgrades</p>
            </div>
        </div>
    </div>
  );
};
