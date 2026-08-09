export type UserRole = string;

export interface AdminUser {
  _id: string;
  id?: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  mustChangePassword?: boolean;
  onboardingEmailQueued?: boolean;
  failedLoginAttempts: number;
  lockedUntil?: string;
  lastFailedLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  role?: UserRole;
  isVerified?: true;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  role?: UserRole;
  isVerified?: boolean;
}

export interface UserListQuery {
  page?: number;
  limit?: number;
  role?: UserRole;
  isVerified?: boolean;
  search?: string;
}

export interface UserPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface UserLockStatus {
  email: string;
  isLocked: boolean;
  lockedUntil: string | null;
  failedLoginAttempts: number;
  lastFailedLoginAt: string | null;
}

export interface AdminSession {
  _id: string;
  id?: string;
  userId: string;
  userAgent?: string;
  ip?: string;
  expiresAt: string;
  lastUsedAt: string;
  createdAt: string;
  updatedAt: string;
  expired: boolean;
}
