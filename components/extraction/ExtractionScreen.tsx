'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Users, Bot, Workflow, Megaphone, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchInboxData } from '@/lib/api';

// Define the honeycombs
export const honeycombs = [
  { id: 'inbox', label: 'Inbox', icon: Mail, color: 'text-blue-400' },
  { id: 'contacts', label: 'Contacts', icon: Users, color: 'text-purple-400' },
  { id: 'employees', label: 'AI Employees', icon: Bot, color: 'text-emerald-400' },
  { id: 'workflows', label: 'Workflows', icon: Workflow, color: 'text-orange-400' },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, color: 'text-pink-400' },
];

interface ExtractionScreenProps {
  onComplete: (data: any[]) => void;
}

export const ExtractionScreen = ({ onComplete }: ExtractionScreenProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleSelect = async (id: string) => {
    if (isExtracting) return;
    setSelectedId(id);
    setIsExtracting(true);

    // Fetch data and wait for minimum animation time
    const [data] = await Promise.all([
        fetchInboxData(),
        new Promise(resolve => setTimeout(resolve, 2500)) // Minimum 2.5s for animation
    ]);

    onComplete(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden font-sans">
        {/* Background Animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
             {/* Core Glow */}
             <div className="absolute w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
             
            {/* Rotating Rings */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[600px] h-[600px] rounded-full border border-blue-500/10 border-dashed"
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[500px] h-[500px] rounded-full border border-blue-400/20 border-t-transparent border-l-transparent"
            />
            <motion.div 
                animate={{ rotate: 180 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] rounded-full border-2 border-blue-500/30 border-r-transparent border-b-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
        </div>

        {/* Honeycomb Grid */}
        <div className="relative z-10 flex flex-wrap justify-center gap-6 max-w-2xl p-4">
            {honeycombs.map((item, index) => (
                <HoneycombItem 
                    key={item.id} 
                    item={item} 
                    isSelected={selectedId === item.id}
                    isDimmed={selectedId !== null && selectedId !== item.id}
                    onClick={() => handleSelect(item.id)}
                    index={index}
                />
            ))}
        </div>

        {/* Status Text Area */}
        <div className="absolute bottom-24 w-full text-center h-20">
            <AnimatePresence mode="wait">
                {isExtracting ? (
                    <motion.div 
                        key="extracting"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 mb-2">
                            Extracting Information...
                        </h2>
                        <p className="text-slate-400 text-sm max-w-md mx-auto px-4">
                            We are extracting information from the selected module to populate your dashboard.
                        </p>
                        <motion.div 
                            className="mt-6 w-64 h-1 bg-slate-800 rounded-full overflow-hidden"
                        >
                            <motion.div 
                                className="h-full bg-blue-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <p className="text-slate-500 text-sm uppercase tracking-widest">Select a Module to Initialize</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
};

const HoneycombItem = ({ item, isSelected, isDimmed, onClick, index }: any) => {
    return (
        <motion.button
            layoutId={`honeycomb-${item.id}`} // Shared layout ID for transition
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: isDimmed ? 0.3 : 1, 
                scale: isSelected ? 1.1 : 1,
                filter: isDimmed ? "blur(2px)" : "blur(0px)",
                zIndex: isSelected ? 50 : 1
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={!isSelected && !isDimmed ? { scale: 1.1, zIndex: 10 } : {}}
            whileTap={!isSelected && !isDimmed ? { scale: 0.95 } : {}}
            className={cn(
                "w-28 h-32 flex flex-col items-center justify-center relative cursor-pointer group focus:outline-none",
                "transition-all duration-300"
            )}
        >
             {/* Hexagon Background Shape */}
            <div 
                className={cn(
                    "absolute inset-0 bg-slate-800/80 backdrop-blur-md hexagon-clip border-0",
                    isSelected ? "bg-blue-900/80" : "group-hover:bg-slate-700/90",
                    "transition-colors duration-300"
                )}
                style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    zIndex: -1
                }}
            />
            
            {/* Border Glow Effect */}
            <div 
                className={cn(
                    "absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    isSelected && "opacity-100 from-blue-500/20 to-purple-500/20"
                )}
                style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    zIndex: -1
                }}
            />

            {/* Icon & Label */}
            <motion.div 
                className={cn("mb-2 p-2 rounded-full bg-slate-900/50", item.color)}
                animate={isSelected ? { scale: 1.2, y: -5 } : {}}
            >
                <item.icon className="w-8 h-8" />
            </motion.div>
            <span className={cn("text-xs font-medium text-slate-300 group-hover:text-white transition-colors", isSelected && "text-white font-bold")}>
                {item.label}
            </span>
            
            {/* Selection Ring */}
            {isSelected && (
                <motion.div
                    layoutId={`selection-ring-${item.id}`}
                    className="absolute inset-0 border-2 border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    style={{
                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        zIndex: 1
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </motion.button>
    );
};
