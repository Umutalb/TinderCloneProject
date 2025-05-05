export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  age: number;
  gender: string;
  location: string;
  interests: string[];
  photos: string[];
  preferences: {
    ageRange: [number, number];
    distance: number;
    gender: string[];
  };
  createdAt: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedUser: UserProfile;
  createdAt: string;
  lastMessage?: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface SwipeAction {
  userId: string;
  targetUserId: string;
  action: 'like' | 'dislike' | 'superlike';
  timestamp: string;
}