'use client';

import { Mail, Users, Bot, Workflow, Megaphone, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'inbox', label: 'Inbox', icon: Mail },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'employees', label: 'AI Employees', icon: Bot },
  { id: 'workflows', label: 'Workflows', icon: Workflow },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
];

export const TopNavbar = () => {
  const activeTab = 'inbox';

  return (
    <div 
      className="bg-white dark:bg-slate-950 flex items-center justify-between shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden w-full max-w-full"
      style={{
         width: 'calc(100% - 11.22px)',
         height: '39.3px',
         marginTop: '5.61px',
         marginLeft: '5.61px',
         marginRight: '5.61px',
         borderRadius: '11.23px',
         paddingTop: '7.02px',
         paddingRight: '11.23px',
         paddingBottom: '7.02px',
         paddingLeft: '11.23px',
         gap: '5.61px'
      }}
    >
       {/* Left Side */}
       <div className="flex items-center gap-8 flex-1 overflow-hidden">
          {/* Logo Frame */}
          <div 
             className="flex items-center shrink-0"
             style={{
                width: '64.4px',
                height: '22.46px',
                justifyContent:'space-between',
                paddingRight: '16.84px',
                gap: '7.02px',
             }}
          >
             <div className="w-6 h-6 bg-[#FF3B30] rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12v.01" />
                    <path d="M8 12h.01" />
                    <path d="M16 12h.01" />
                    <path d="M7 7h10" />
                    <path d="M7 17h10" />
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
             </div>
             <span 
                className="font-bold shrink-0"
                style={{
                    width: '36.49px',
                    height: '16.84px',
                    color: '#FE3265',
                    fontSize: '14px',
                    lineHeight: '16.84px'
                }}
             >
                heyy
             </span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient pr-4">
             {navItems.map((item) => {
                const isActive = item.id === activeTab;
                return (
                   <button
                     key={item.id}
                     className={cn(
                        "flex items-center justify-center transition-all",
                        isActive 
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-slate-700" 
                          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 font-medium"
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
                        width: item.id === 'inbox' ? '59.68px' : 'auto',
                     }}
                   >
                      <item.icon 
                        className={cn(
                            isActive ? "stroke-[2.5px]" : "stroke-2"
                        )} 
                        style={{ width: '12px', height: '12px' }}
                      />
                      <span>{item.label}</span>
                   </button>
                );
             })}
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-1 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
             <Menu className="w-5 h-5" />
          </button>
       </div>

       {/* Right Side */}
       <div className="flex items-center gap-4">
          <button 
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 flex items-center justify-center"
            style={{
                width: '29.47px',
                height: '25.26px'
            }}
          >
             <Settings className="w-full h-full" strokeWidth={1.5} />
          </button>
          
          <div 
            className="flex items-center bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 rounded-full transition-colors cursor-pointer"
            style={{
                // width: '123.1px', // Removed fixed width to prevent cropping
                height: '25.26px',
                paddingLeft: '8.42px',
                paddingRight: '8.42px',
                gap: '5.61px'
            }}
          >
             <div className="w-5 h-5 bg-[#FF3B30] rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                M
             </div>
             <span 
                className="text-slate-900 dark:text-white truncate"
                style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: '"SF Compact", sans-serif'
                }}
             >
                Michael Johnson
             </span>
          </div>
       </div>
    </div>
  );
};
