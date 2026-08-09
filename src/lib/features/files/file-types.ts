export type FileVisibility = "public" | "private";

export interface StoredAssetDto {
  provider: string;
  storageKey: string;
  originalName: string;
  sourceOriginalName?: string;
  mimeType: string;
  size: number;
  extension: string;
  visibility: FileVisibility;
  uploadedAt: string;
  title?: string;
  description?: string;
  altText?: string;
  caption?: string;
  width?: number;
  height?: number;
  url?: string;
}

export interface FileActor {
  _id: string;
  email: string;
  role: string;
}

export interface ManagedFileDto {
  _id: string;
  id?: string;
  ownerId: string | FileActor;
  createdBy: string | FileActor;
  category: string;
  label?: string;
  asset: StoredAssetDto;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ManagedFileQuery {
  page?: number;
  limit?: number;
  ownerId?: string;
  category?: string;
  provider?: string;
  search?: string;
}

export interface ManagedFilePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
