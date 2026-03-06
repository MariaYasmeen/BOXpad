
import { Thread, MOCK_THREADS } from './data';

export async function fetchInboxData(): Promise<Thread[]> {
  try {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 1500));

    // Fetch users from JSONPlaceholder to simulate "Contacts" or "Senders"
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();

    // Map these users to our Thread structure
    // We mix real API data with our mock structure for the UI requirements
    const apiThreads: Thread[] = users.slice(0, 5).map((user: any, index: number) => ({
        id: user.id + 10, // Offset ID to avoid conflict with mocks
        user: {
            id: user.id,
            name: user.name,
            avatar: user.name.charAt(0) + user.name.split(' ')[1].charAt(0),
            email: user.email,
            phone: user.phone
        },
        lastMessage: `Hey, checking in about the ${user.company.name} project.`,
        timestamp: 'Just now',
        unreadCount: index === 0 ? 1 : 0, // First one is unread
        isAI: false,
        tags: ['API Data']
    }));

    // Combine with our specific mock threads (which match the design screenshots)
    return [...MOCK_THREADS, ...apiThreads];
    
  } catch (error) {
    console.error("Failed to fetch data", error);
    return MOCK_THREADS; // Fallback
  }
}
