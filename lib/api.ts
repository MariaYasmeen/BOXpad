
import { Thread, Message, User } from './data';

const CURRENT_USER_EMAIL = "Michael.Johnson@example.com";

export async function fetchInboxData(): Promise<Thread[]> {
  try {
    // Parallel fetch for better performance
    const [usersResponse, postsResponse, randomUsersResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://randomuser.me/api/?results=10')
    ]);

    const users = await usersResponse.json();
    const posts = await postsResponse.json();
    const randomUsersData = await randomUsersResponse.json();
    const randomUsers = randomUsersData.results;

    // Map these users to our Thread structure
    const apiThreads: Thread[] = users.slice(0, 10).map((user: any, index: number) => {
      const randomUser = randomUsers[index];
      // Find a post by this user to use as last message preview
      const userPost = posts.find((p: any) => p.userId === user.id);
      
      return {
        id: user.id, // Use real ID
        user: {
            id: user.id,
            name: user.name,
            // Use RandomUser photo for fidelity
            avatar: randomUser?.picture?.thumbnail || (user.name.charAt(0) + user.name.split(' ')[1]?.charAt(0)),
            email: user.email,
            phone: user.phone,
            role: user.company.name // Use company as role/context
        },
        // Use post title as thread preview/subject
        lastMessage: userPost ? userPost.title : `Hey, checking in about the ${user.company.name} project.`,
        timestamp: new Date(Date.now() - index * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Stagger timestamps
        unreadCount: index < 3 ? 1 : 0, // Mark first few as unread
        isAI: index === 2 || index === 5, // Randomly assign AI status
        tags: [randomUser?.location?.city || 'Remote'],
        notes: user.company.catchPhrase // Use company catchphrase as note
      };
    });

    return apiThreads;
    
  } catch (error) {
    console.error("Failed to fetch data", error);
    return []; // Return empty array on error instead of mock data
  }
}

export async function fetchThreadMessages(threadId: number): Promise<Message[]> {
  try {
    // Use comments endpoint as messages
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${threadId}`);
    const comments = await response.json();

    return comments.map((comment: any, index: number) => {
      // Logic gate for sender: alternating or based on email logic if we could match it.
      // Since JSONPlaceholder emails are random, we'll force some to be "me" (senderId: 0)
      // to demonstrate the UI requirement: "If the email matches the current user... purple bubble"
      
      // For demo purposes, make every 2nd message sent by "me" to show conversation flow
      const isMe = index % 2 === 1; 
      
      return {
        id: comment.id,
        senderId: isMe ? 0 : threadId, // 0 is me, threadId is the other user
        content: comment.body,
        timestamp: new Date(Date.now() - (comments.length - index) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        type: 'text'
      };
    });
  } catch (error) {
    console.error("Failed to fetch messages", error);
    return [];
  }
}

export async function fetchUnreadCount(): Promise<number> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    // Filter completed: false
    return todos.filter((todo: any) => !todo.completed).length;
  } catch (error) {
    console.error("Failed to fetch todos", error);
    return 0; // Fallback
  }
}
