import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NavButtonProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  variant?: 'navbar' | 'sidebar';
  className?: string;
  layoutId?: string;
}

export const NavButton = ({ 
  label, 
  icon: Icon, 
  isActive, 
  onClick, 
  variant = 'navbar',
  className,
  layoutId
}: NavButtonProps) => {
  
  if (variant === 'sidebar') {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-normal transition-colors",
                isActive 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900",
                className
            )}
        >
            <Icon className={cn("w-4 h-4", isActive && "stroke-[2.5px]")} />
            <span>{label}</span>
        </button>
    );
  }

  // Navbar variant (Default)
  return (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center justify-center transition-all relative",
            isActive 
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 font-medium",
            className
        )}
        style={{
            // Exact specs from Figma
            height: '23.86px',
            paddingLeft: '7.02px',
            paddingRight: '7.02px',
            gap: '5.61px',
            borderRadius: '5.61px',
            fontSize: '9.82px',
            lineHeight: '100%',
            letterSpacing:'0%',
            fontFamily: '"SF Compact", sans-serif',
            fontWeight: isActive ? 600 : 556,
            borderWidth: isActive ? '0.7px' : '0px',
            minWidth: label === 'Inbox' ? '59.68px' : 'auto',
        }}
    >
        {layoutId && (
            <motion.div
                layoutId={layoutId}
                className={cn("absolute inset-0 rounded-[5.61px]", isActive ? "bg-slate-100 dark:bg-slate-800" : "")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ zIndex: -1 }}
            />
        )}
        <Icon 
            className={cn(
                isActive ? "stroke-[2.5px]" : "stroke-2"
            )} 
            style={{ width: '12px', height: '12px' }}
        />
        <span>{label}</span>
    </button>
  );
};
