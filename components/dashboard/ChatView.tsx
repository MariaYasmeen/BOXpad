
'use client';

import { useState, useEffect } from 'react';
import { Thread, Message } from '@/lib/data';
import { fetchThreadMessages } from '@/lib/api';
import { Send, Image, Smile, Mic, Video, MoreVertical, Sparkles, Plus, Search, ArrowLeft, CornerUpLeft, FileText, CheckCheck, Clock, Save, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { messageSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatViewProps {
  thread?: Thread;
  onBack?: () => void;
  onToggleRightPanel?: () => void;
  isRightPanelOpen?: boolean;
}

export const ChatView = ({ thread, onBack, onToggleRightPanel, isRightPanelOpen }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset messages or load specific messages when thread changes
  useEffect(() => {
    if (thread) {
        setIsLoading(true);
        setMessages([]); // Clear previous messages
        fetchThreadMessages(thread.id).then(msgs => {
            setMessages(msgs);
            setIsLoading(false);
        });
    }
  }, [thread]);

  if (!thread) {
    return (
        <div 
            className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-400 font-sans"
            style={{
                borderRadius: '8.42px', 
            }}
        >
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
    <div 
        className="flex-1 flex flex-col bg-white dark:bg-slate-950 relative font-sans overflow-hidden"
        style={{
            borderRadius: '8.42px', 
            marginBottom: '10px',
            height: 'calc(100% - 20px)'
        }}
    >
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden">
                    <ArrowLeft className="w-5 h-5" />
                </button>
            )}
            
            {/* User Name */}
            <div 
                onClick={onToggleRightPanel}
                className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                style={{
                    height: '29.04px',
                    borderRadius: '8.42px',
                    padding: '7.02px',
                    gap: '8.42px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <h3 className="font-bold text-sm text-slate-900 dark:text-white whitespace-nowrap">
                    {thread.user.name}
                </h3>
            </div>
        </div>

        {/* Icons Group */}
        <div 
            style={{
                width: 'auto',
                height: '22.46px',
                gap: '8.42px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <button 
                onClick={onToggleRightPanel}
                style={{
                    width: '22.46px',
                    height: '22.46px',
                    borderRadius: '5.61px',
                    padding: '4.21px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isRightPanelOpen ? '#000000' : '#EBEBEB',
                    color: isRightPanelOpen ? '#ffffff' : '#000000'
                }}
                className="transition-opacity hover:opacity-80 lg:flex items-center justify-center"
                title="Toggle Right Panel"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg>
            </button>
            {[MoreVertical, History, Save].map((Icon, i) => {
                const isLast = i === 2;
                return (
                    <button 
                        key={i} 
                        style={{
                            width: '22.46px',
                            height: '22.46px',
                            borderRadius: '5.61px',
                            padding: '4.21px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isLast ? '#000000' : '#EBEBEB',
                            color: isLast ? '#ffffff' : '#000000'
                        }}
                        className="transition-opacity hover:opacity-80"
                    >
                        <Icon className="w-full h-full" strokeWidth={2.5} />
                    </button>
                );
            })}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-[9.82px] no-scrollbar min-h-0">
        {/* Date Pill - Dynamic */}
        <div className="flex justify-center mb-6">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-[4px] text-[10px] font-semibold text-slate-500">
                {isLoading ? <Skeleton className="h-4 w-16" /> : (messages.length > 0 ? 'Today' : 'No messages')}
            </div>
        </div>

        {isLoading ? (
            <div className="space-y-4">
                <div className="flex items-end gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-10 w-[60%] rounded-2xl rounded-bl-none" />
                </div>
                <div className="flex items-end gap-2 flex-row-reverse">
                    <Skeleton className="h-12 w-[40%] rounded-2xl rounded-br-none" />
                </div>
                <div className="flex items-end gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-8 w-[50%] rounded-2xl rounded-bl-none" />
                </div>
                 <div className="flex items-end gap-2 flex-row-reverse">
                    <Skeleton className="h-16 w-[70%] rounded-2xl rounded-br-none" />
                </div>
            </div>
        ) : (
            messages.map((msg) => {
                const isSent = msg.senderId === 0;
                return (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full mb-[9.82px]",
                            isSent ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            style={{
                                width: 'auto',
                                gap: '5.61px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                opacity: 1,
                                padding:"5px",
                            }}
                        >
                            {/* Sent Message Layout: Timestamp/Tick (Left) + Bubble (Right) */}
                            {isSent && (
                                <>
                                    <div className="flex flex-col items-end pt-1 gap-1 min-w-[18px] ml-auto">
                                        <span className="text-[10px] text-black leading-none whitespace-nowrap">{msg.timestamp}</span>
                                        <CheckCheck className="w-3 h-3 text-blue-500" />
                                    </div>
                                    <div
                                        style={{
                                            borderRadius: '8.42px',
                                            padding: '10.61px',
                                            backgroundColor: '#EDE3FD',
                                            gap: '8.42px',
                                            opacity: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            maxWidth: '210.53px',
                                            width: 'fit-content',
                                            height: 'auto',
                                            minHeight: 'auto'
                                        }}
                                        className="text-slate-900 text-[13px]"
                                    >
                                        <p className="leading-tight w-full">{msg.content}</p>
                                    </div>
                                </>
                            )}

                            {/* Received Message Layout: Bubble (Left) + Timestamp/Tick (Right) */}
                            {!isSent && (
                                <>
                                    <div
                                        style={{
                                            borderRadius: '8.42px',
                                            padding: '10.61px',
                                            backgroundColor: '#EFF2F2',
                                            gap: '8.42px',
                                            opacity: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            maxWidth: '210.53px',
                                            width: 'fit-content',
                                            height: 'auto',
                                            minHeight: 'auto'
                                        }}
                                        className="text-slate-900 text-[13px]"
                                    >
                                        <p className="leading-tight w-full">{msg.content}</p>
                                    </div>
                                    <div className="flex flex-col items-start pt-1 gap-1 min-w-[18px]">
                                        <span className="text-[10px] text-black leading-none whitespace-nowrap">{msg.timestamp}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })
        )}
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
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <Image className="w-4 h-4" outline="black" />
                     </button>
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <Video className="w-4 h-4" outline="black" />
                     </button>
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <FileText className="w-4 h-4" outline="black" />
                     </button>
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <Smile className="w-4 h-4" outline="black" />
                     </button>
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <CornerUpLeft className="w-4 h-4" outline="black" />
                     </button>
                </div>
                <div className="flex items-center gap-3">
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <Sparkles className="w-4 h-4" outline="black" />
                     </button>
                     <button className="text-black hover:opacity-80 transition-opacity">
                        <Mic className="w-4 h-4" outline="black" />
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
