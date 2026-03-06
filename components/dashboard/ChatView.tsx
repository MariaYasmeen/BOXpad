
'use client';

import { useState, useEffect } from 'react';
import { MOCK_MESSAGES, Thread } from '@/lib/data';
import { Send, Image, Smile, Mic, Paperclip, Phone, Video, MoreVertical, Sparkles, Plus, Search, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { messageSchema } from '@/lib/schemas';
import { z } from 'zod';

interface ChatViewProps {
  thread?: Thread;
  onBack?: () => void;
}

export const ChatView = ({ thread, onBack }: ChatViewProps) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Reset messages or load specific messages when thread changes
  // For now, we'll just keep MOCK_MESSAGES but ideally this would fetch from API
  useEffect(() => {
    if (thread) {
        // Here you would fetch messages for this thread
        // setMessages(...)
    }
  }, [thread]);

  if (!thread) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-400">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-400" />
            </div>
            <p>Select a conversation to start chatting</p>
        </div>
    );
  }

  const handleSendMessage = () => {
    // Zod Validation
    const result = messageSchema.safeParse({ content: newMessage });
    
    if (!result.success) {
        // In a real app, you'd show a toast or inline error
        // For now, we'll just log or set a temporary error state if we had one
        console.error(result.error);
        return;
    }

    setMessages([
        ...messages,
        {
            id: messages.length + 1,
            senderId: 0,
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: true,
            type: 'text'
        }
    ]);
    setNewMessage('');
    setError(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 relative">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden">
                    <ArrowLeft className="w-5 h-5" />
                </button>
            )}
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm">
                    {thread.user.avatar}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
            </div>
            <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">{thread.user.name}</h3>
                <p className="text-xs text-slate-500">Active now</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <MoreVertical className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
            {messages.map((msg) => (
                <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "flex w-full",
                        msg.senderId === 0 ? "justify-end" : "justify-start"
                    )}
                >
                    <div className={cn(
                        "max-w-[70%] p-4 rounded-2xl shadow-sm relative group",
                        msg.senderId === 0 
                            ? (msg.type === 'ai' 
                                ? "bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-slate-800 dark:text-slate-200 border border-purple-200 dark:border-purple-800"
                                : "bg-blue-600 text-white rounded-tr-none")
                            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                    )}>
                        {msg.type === 'ai' && (
                            <div className="absolute -top-3 -left-3 bg-white dark:bg-slate-800 p-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                            </div>
                        )}
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <span className={cn(
                            "text-[10px] mt-1 block text-right opacity-70",
                            msg.senderId === 0 && msg.type !== 'ai' ? "text-blue-100" : "text-slate-400"
                        )}>
                            {msg.timestamp}
                        </span>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all shadow-sm">
            <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
                <Plus className="w-5 h-5" />
            </button>
            <input 
                type="text" 
                placeholder="Type something..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-200 px-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="flex items-center gap-1 pr-2 border-l border-slate-200 dark:border-slate-800 pl-2">
                 <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <Mic className="w-5 h-5" />
                </button>
                 <button 
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95 duration-200"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
