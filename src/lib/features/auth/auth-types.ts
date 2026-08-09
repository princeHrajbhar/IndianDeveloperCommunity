export type UserRole = string;

export interface AuthUser {
  userId: string;
  email: string;
  role: UserRole;
  permissions: string[];
  isVerified: boolean;
  mustChangePassword?: boolean;
}

export interface AuthSession {
  id: string;
  userAgent?: string;
  ip?: string;
  lastUsedAt: string;
  createdAt: string;
}

export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface MessageEnvelope {
  success: boolean;
  message: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
  type: "REGISTER" | "RESET_PASSWORD";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  credential: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
