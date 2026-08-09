import type { StoredAssetDto } from "@/src/lib/features/files/file-types";

export type VideoFormat = "short" | "long";
export type VideoStatus = "draft" | "published";
export type VideoOrientation = "portrait" | "landscape" | "square";

export interface VideoChapter { title: string; startSeconds: number }
export interface VideoAnalytics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watchSeconds: number;
  completions: number;
}
export interface VideoDto {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  format: VideoFormat;
  orientation: VideoOrientation;
  status: VideoStatus;
  description?: string;
  caption?: string;
  altText?: string;
  category?: string;
  tags: string[];
  language: string;
  durationSeconds?: number;
  transcript?: string;
  chapters: VideoChapter[];
  seoTitle?: string;
  seoDescription?: string;
  publishedBy: string;
  analytics: VideoAnalytics;
  video: StoredAssetDto;
  thumbnail?: StoredAssetDto;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
export interface VideoComment {
  _id: string;
  id?: string;
  userId: string;
  displayName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface VideoQuery { page?: number; limit?: number; format?: VideoFormat; status?: VideoStatus; search?: string }
export interface VideoListEnvelope { success: boolean; data: VideoDto[]; pagination: { page: number; limit: number; total: number; totalPages: number } }
export interface VideoCommentListEnvelope { success: boolean; data: VideoComment[]; pagination: { page: number; limit: number; total: number; totalPages: number } }
export interface VideoInteraction { liked: boolean; analytics: VideoAnalytics }
