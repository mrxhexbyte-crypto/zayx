export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'moderator';
  isActive: boolean;
  preferences?: UserPreferences;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  notifications?: boolean;
  newsletter?: boolean;
  currency?: string;
  language?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}
