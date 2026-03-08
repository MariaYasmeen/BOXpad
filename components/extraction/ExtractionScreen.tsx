'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Users, Bot, Workflow, Megaphone, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { fetchInboxData } from '@/lib/api';
import { Thread } from '@/lib/data';

// Define the honeycombs
export const honeycombs = [
  { id: 'inbox', label: 'Inbox', icon: Mail, color: 'text-blue-400' },
  { id: 'contacts', label: 'Contacts', icon: Users, color: 'text-purple-400' },
  { id: 'employees', label: 'AI Employees', icon: Bot, color: 'text-emerald-400' },
  { id: 'workflows', label: 'Workflows', icon: Workflow, color: 'text-orange-400' },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, color: 'text-pink-400' },
];

interface ExtractionScreenProps {
  onComplete: (data: Thread[]) => void;
}

export const ExtractionScreen = ({ onComplete }: ExtractionScreenProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  // Removed unused progress state since we don't display a progress bar

  const handleSelect = async (id: string) => {
    if (isExtracting) return;
    setSelectedId(id);
    setIsExtracting(true);

    // Simulate progress internally without state if needed, or just wait
    // Fetch data and wait for minimum animation time
    const [data] = await Promise.all([
        fetchInboxData(),
        new Promise(resolve => setTimeout(resolve, 2500)) // Minimum 2.5s for animation
    ]);

    setTimeout(() => {
        onComplete(data);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#020617] text-white overflow-hidden font-sans">
        
        {/* Section One: Animated Control Center (Top/Main) */}
        <div className="relative flex-1 flex flex-col items-center justify-center w-full overflow-hidden min-h-[60%]">
            
            {/* Deep Blue Background & Glowing Lines - Updated Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617] to-[#020617]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
            </div>

            {/* Animated Circular Patterns - Reduced Sizes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Outer Ring */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border border-blue-500/10 border-dashed opacity-40"
                    style={{ width: '288px', height: '273px' }}
                />
                {/* Middle Ring */}
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border border-blue-400/20 opacity-50"
                    style={{ 
                        width: '210px', 
                        height: '200px', 
                        borderTopColor: 'transparent', 
                        borderLeftColor: 'transparent' 
                    }}
                />
                {/* Inner Glowing Ring */}
                <motion.div 
                    animate={{ rotate: 180 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    style={{ 
                        width: '140px', 
                        height: '135px',
                        borderRightColor: 'transparent', 
                        borderBottomColor: 'transparent' 
                    }}
                />
                {/* Center Core */}
                 <div className="absolute w-[80px] h-[80px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Honeycomb Grid - Scattered Arrangement */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {honeycombs.map((item, index) => {
                     // Define responsive positions
                     const positions = [
                         "top-[15%] left-[10%] md:top-[15%] md:left-[20%]", // Inbox
                         "top-[15%] right-[10%] md:top-[20%] md:right-[20%]", // Contacts
                         "bottom-[35%] left-[10%] md:bottom-[40%] md:left-[25%]", // Employees
                         "bottom-[35%] right-[10%] md:bottom-[45%] md:right-[25%]", // Workflows
                         "top-[5%] left-[50%] -translate-x-1/2 md:top-[10%]" // Campaigns
                     ];
                     
                     return (
                        <div key={item.id} className={cn(
                            "absolute pointer-events-auto transition-all duration-1000",
                            positions[index]
                        )}>
                            <HoneycombItem 
                                item={item} 
                                isSelected={selectedId === item.id}
                                isDimmed={selectedId !== null && selectedId !== item.id}
                                onClick={() => handleSelect(item.id)}
                                index={index}
                            />
                        </div>
                     );
                })}
            </div>

            {/* Status Text - Below Circular Animation */}
            <div className="absolute top-[calc(50%+80px)] left-0 right-0 z-20 text-center flex justify-center">
                <AnimatePresence mode="wait">
                    {isExtracting ? (
                        <motion.div 
                            key="extracting"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                Extracting Information...
                            </h2>
                            <p className="text-blue-200/70 text-xs md:text-sm font-light max-w-xs md:max-w-md mx-auto leading-relaxed">
                                We are extracting information from the above honey combs to your system
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-2 drop-shadow-lg">
                                Select Data Source
                            </h2>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                                Initialize Extraction Module
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Section Two: Dashboard Image Section (Bottom) */}
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative h-[40%] w-full flex justify-center items-end overflow-hidden px-4 md:px-0"
        >
             {/* Dashboard Image Container */}
            <div className="w-full max-w-5xl h-full relative group perspective-1000">
                <div className="absolute inset-x-4 bottom-0 h-full transform transition-transform duration-700 hover:scale-[1.02]">
                     <Image 
                        src="/33.png" 
                        alt="Dashboard Preview" 
                        fill
                        className="object-cover object-top rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(59,130,246,0.3)] border-t border-x border-white/10"
                        priority
                     />
                     {/* Overlay Gradient for "Cinematic" look */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>
            </div>
        </motion.div>
    </div>
  );
};

interface HoneycombItemProps {
    item: {
        id: string;
        label: string;
        icon: LucideIcon;
        color: string;
    };
    isSelected: boolean;
    isDimmed: boolean;
    onClick: () => void;
    index: number;
}

const HoneycombItem = ({ item, isSelected, isDimmed, onClick, index }: HoneycombItemProps) => {
    return (
        <motion.button
            layoutId={`honeycomb-${item.id}`}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
                opacity: isDimmed ? 0.3 : 1, 
                scale: isSelected ? 1.15 : 1,
                filter: isDimmed ? "blur(3px) grayscale(100%)" : "blur(0px) grayscale(0%)",
                y: isSelected ? -10 : 0,
                zIndex: isSelected ? 50 : 1
            }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={!isSelected && !isDimmed ? { scale: 1.05, zIndex: 10 } : {}}
            className="flex flex-col items-center justify-center relative cursor-pointer group focus:outline-none"
        >
             {/* Floating Animation Wrapper */}
            <motion.div
                animate={!isSelected ? { y: [0, -6, 0] } : {}}
                transition={{ 
                    duration: 3 + (index % 3) * 0.7, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5 
                }}
                className="flex items-center justify-center relative w-[90px] h-[90px]"
            >
                {/* SVG Trace Border & Background */}
                <svg 
                    className="absolute inset-0 w-full h-full overflow-visible"
                    viewBox="0 0 112 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M56 2 L110 33 L110 95 L 56 126 L 2 95 L 2 33 Z"
                        fill="#00000033"
                        stroke="#FFFFFF14"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                            "transition-all duration-300",
                            isSelected && "stroke-blue-500 fill-blue-900/40 stroke-[2px]",
                            !isSelected && "group-hover:stroke-white/30 group-hover:fill-black/40"
                        )}
                    />
                </svg>
                
                {/* Icon */}
                <div className="relative z-10">
                    <item.icon className={cn("w-6 h-6 text-white", isSelected && "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]")} />
                </div>

                {/* Selection Glow (Behind) */}
                {isSelected && (
                     <motion.div
                        className="absolute inset-0 bg-blue-500/30 blur-xl -z-10"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        style={{
                            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        }}
                     />
                )}
            </motion.div>
        </motion.button>
    );
};
