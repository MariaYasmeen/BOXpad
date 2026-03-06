
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

export const MOCK_THREADS: Thread[] = [
  {
    id: 1,
    user: { id: 1, name: 'Olivia Mckinsey', avatar: 'OM', email: 'olivia.mckinsey@gmail.com', phone: '+1 (312) 555-0134' },
    lastMessage: "Oh my god 😍 I'll try it ASAP, thank you so much!!",
    timestamp: '23:23',
    unreadCount: 1,
    tags: ['Sales', 'Chicago'],
    isAI: false
  },
  {
    id: 2,
    user: { id: 2, name: 'Sara Williams', avatar: 'SW' },
    lastMessage: "Good Evening, Emily! Hope you are doing well.",
    timestamp: '23:16',
    unreadCount: 0,
    tags: ['Support'],
    isAI: false
  },
  {
    id: 3,
    user: { id: 3, name: 'Frank Thompson', avatar: 'FT' },
    lastMessage: "Thank you for signing up Frank! If there is anything else...",
    timestamp: '22:20',
    unreadCount: 0,
    isAI: true
  },
  {
    id: 4,
    user: { id: 4, name: 'Grace Lee', avatar: 'GL' },
    lastMessage: "I am sending you the report right away.",
    timestamp: '20:43',
    unreadCount: 0,
    tags: ['Internal'],
    isAI: false
  },
  {
    id: 5,
    user: { id: 5, name: 'Henry Adams', avatar: 'HA' },
    lastMessage: "Thank you for filling out our survey!",
    timestamp: '17:37',
    unreadCount: 2,
    isAI: true
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 1, senderId: 1, content: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?", timestamp: "23:08", isRead: true, type: 'text' },
  { id: 2, senderId: 0, content: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?", timestamp: "23:09", isRead: true, type: 'ai' },
  { id: 3, senderId: 1, content: "Yes, it's olivia.mckinsey@gmail.com", timestamp: "23:16", isRead: true, type: 'text' },
  { id: 4, senderId: 0, content: "Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.", timestamp: "23:18", isRead: true, type: 'ai' },
  { id: 5, senderId: 1, content: "I see it. resetting now...", timestamp: "23:19", isRead: true, type: 'text' },
  { id: 6, senderId: 1, content: "Done! I'm logged in. Thanks!", timestamp: "23:20", isRead: true, type: 'text' },
  { id: 7, senderId: 0, content: "Perfect 🎉 Your plan is ready under \"My Programs\". Since you're starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium", timestamp: "23:20", isRead: true, type: 'ai' },
  { id: 8, senderId: 1, content: "Oh my god 😍 I'll try it ASAP, thank you so much!!", timestamp: "23:23", isRead: true, type: 'text' },
];
