
'use client';

import { useState, useEffect } from 'react';
import { MOCK_MESSAGES, Thread } from '@/lib/data';
import { Send, Image, Smile, Mic, Video, MoreVertical, Sparkles, Plus, Search, ArrowLeft, CornerUpLeft, FileText, CheckCheck, Clock, Save, History } from 'lucide-react';
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
  useEffect(() => {
    if (thread) {
        // Here you would fetch messages for this thread
    }
  }, [thread]);

  if (!thread) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-400 font-sans">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
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
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 relative font-sans h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden">
                    <ArrowLeft className="w-5 h-5" />
                </button>
            )}
            
            {/* User Name */}
            <div 
                style={{
                    width: '110.04px',
                    height: '29.04px',
                    borderRadius: '8.42px',
                    padding: '7.02px',
                    gap: '8.42px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {thread.user.name}
                </h3>
            </div>
        </div>

        {/* Icons Group */}
        <div 
            style={{
                width: '78.6px',
                height: '22.46px',
                gap: '5.61px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {[MoreVertical, History, Save].map((Icon, i) => (
                <button 
                    key={i} 
                    style={{
                        width: '22.46px',
                        height: '22.46px',
                        borderRadius: '5.61px',
                        padding: '4.21px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
                >
                    <Icon className="w-full h-full" strokeWidth={2.5} />
                </button>
            ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-[9.82px] no-scrollbar min-h-0">
        {/* Date Pill */}
        <div className="flex justify-center mb-6">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-[4px] text-[10px] font-semibold text-slate-500">
                28 August 2025
            </div>
        </div>

        <AnimatePresence initial={false}>
            {messages.map((msg) => (
                <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "flex w-full group items-start gap-2",
                        msg.senderId === 0 ? "flex-row-reverse" : "flex-row"
                    )}
                >
                    {/* Timestamp Outside */}
                    <span className={cn(
                        "text-[10px] text-slate-400 mt-1 flex-shrink-0",
                        msg.senderId === 0 ? "text-right" : "text-left"
                    )}>
                        {msg.timestamp}
                    </span>

                    <div className={cn(
                        "max-w-[70%] p-3 rounded-2xl text-sm relative shadow-sm",
                        msg.senderId === 0 
                            ? "bg-[#EFE9FA] dark:bg-purple-900/20 text-slate-900 dark:text-slate-100 rounded-tr-none" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none"
                    )}>
                        <p className="leading-relaxed text-[13px]">{msg.content}</p>
                        
                        {/* Double Tick for Outgoing (Inside bubble, bottom right) */}
                        {msg.senderId === 0 && (
                            <div className="absolute bottom-1 right-1">
                                <CheckCheck className="w-3 h-3 text-blue-500" />
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Input Area (Fixed Bottom) */}
      <div className="p-4 bg-white dark:bg-slate-950 flex-shrink-0 flex justify-center w-full relative z-10 border-t border-slate-100 dark:border-slate-800">
        <div 
            style={{
                width: '100%',
                height: '81.4px',
                borderRadius: '5.61px',
                gap: '2.81px',
                padding: '5.61px',
                borderWidth: '0.7px',
                display: 'flex',
                flexDirection: 'column'
            }} 
            className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm border"
        >
            {/* Type Something Section */}
            <div 
                style={{
                    width: '100%',
                    height: '33.68px',
                    paddingTop: '8.42px',
                    paddingRight: '11.23px',
                    paddingBottom: '8.42px',
                    paddingLeft: '11.23px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7.02px'
                }}
            >
                <input 
                    type="text" 
                    placeholder="Type something..." 
                    className="flex-1 bg-transparent border-none focus:outline-none text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 font-normal"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
            </div>

            {/* Icons Section */}
            <div 
                style={{
                    width: '100%',
                    height: '33.68px',
                    gap: '2.81px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '5px',
                    paddingRight: '5px'
                }}
            >
                <div className="flex items-center gap-3">
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Image className="w-4 h-4" />
                     </button>
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Video className="w-4 h-4" />
                     </button>
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <FileText className="w-4 h-4" />
                     </button>
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Smile className="w-4 h-4" />
                     </button>
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <CornerUpLeft className="w-4 h-4" />
                     </button>
                </div>
                <div className="flex items-center gap-3">
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Sparkles className="w-4 h-4" />
                     </button>
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Mic className="w-4 h-4" />
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
