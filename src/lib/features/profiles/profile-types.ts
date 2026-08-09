export type ProfileGender =
  | "Male"
  | "Female"
  | "Other"
  | "Prefer not to say";

export interface PublicAsset {
  url?: string;
  originalName?: string;
  mimeType?: string;
  extension?: string;
  size?: number;
  width?: number;
  height?: number;
  uploadedAt?: string;
  alt?: string;
}

export interface SocialLinks {
  portfolio?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  grade?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id?: string;
  companyName: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  achievements?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Profile {
  id: string;
  userId: string;
  email?: string;
  role?: string;
  isVerified?: boolean;
  fullName: string;
  firstName: string;
  lastName: string;
  gender?: ProfileGender;
  phoneNumber: string;
  dateOfBirth: string;
  currentLocation: string;
  headline?: string;
  bio?: string;
  profilePicture?: PublicAsset;
  coverPhoto?: PublicAsset;
  socialLinks: SocialLinks;
  education: Education[];
  experience: Experience[];
  skills: string[];
  languages: string[];
  resume?: PublicAsset;
  isProfileComplete: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  currentLocation: string;
  headline?: string;
  gender?: ProfileGender;
  bio?: string;
  socialLinks?: Partial<SocialLinks>;
  skills?: string[];
  languages?: string[];
}

export type UpdateProfileInput = Partial<CreateProfileInput>;

export interface EducationInput {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  grade?: string;
  description?: string;
}

export interface ExperienceInput {
  companyName: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  achievements?: string[];
}

export interface ProfileStats {
  totalEducation: number;
  totalExperience: number;
  totalSkills: number;
  totalLanguages: number;
  isProfileComplete: boolean;
  lastActive: string;
  updatedAt: string;
}

export interface ProfileCompletion {
  percentage: number;
  completedFields: number;
  totalFields: number;
  fields: {
    personalInfo: boolean;
    dateOfBirth: boolean;
    location: boolean;
    bio: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
    profilePicture: boolean;
  };
}

export interface ProfileStatsResponse {
  stats: ProfileStats;
  completion: ProfileCompletion;
}

export interface ProfileScope {
  userId?: string;
}
