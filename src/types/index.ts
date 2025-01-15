export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  isImportant: boolean;
  weather?: {
    temp: number;
    condition: string;
    icon: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  activeFilter: string;
}