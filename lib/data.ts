
import { Mail, Users, Bot, Workflow, Megaphone } from 'lucide-react';

export interface User {
  id: number;
  name: string;
  avatar: string; // URL or Initials
  role?: string;
  email?: string;
  phone?: string;
  status?: 'online' | 'offline' | 'busy';
}

export interface Message {
  id: number;
  senderId: number; // 0 for current user (me)
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'system' | 'ai';
}

export interface Thread {
  id: number;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  tags?: string[];
  isAI?: boolean;
  notes?: string;
}

export const CURRENT_USER: User = {
  id: 0,
  name: 'Michael Johnson',
  avatar: 'MJ',
  role: 'Admin'
};

export const MENU_ITEMS = [
  { id: 'inbox', label: 'Inbox', icon: Mail, path: '/inbox' },
  { id: 'contacts', label: 'Contacts', icon: Users, path: '/contacts' },
  { id: 'employees', label: 'AI Employees', icon: Bot, path: '/employees' },
  { id: 'workflows', label: 'Workflows', icon: Workflow, path: '/workflows' },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, path: '/campaigns' },
];
