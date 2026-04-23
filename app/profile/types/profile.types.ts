// app/profile/types/profile.types.ts
export interface UserData {
  userId: string;
  email: string;
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
  joined?: string;
  role?: string;
  company?: string;
  skills?: string[];
  stats?: {
    projects: number;
    contributions: number;
    badges: number;
  };
  recentActivity?: Activity[];
  notifications?: Notification[];
}

export interface Activity {
  id: number;
  action: string;
  date: string;
  type: 'project' | 'badge' | 'contribution' | 'article';
}

export interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
}