import type { Pagination } from "@/src/lib/api/api-types";

export type ServicePageStatus = "draft" | "published";
export type ServicePageRenderMode = "html" | "static-bundle";
export type ServicePageCategory = "buy" | "build" | "grow";

export interface ServicePageDto {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  status: ServicePageStatus;
  category: ServicePageCategory;
  renderMode: ServicePageRenderMode;
  fullHtml?: string;
  bundleId?: string;
  entryPath?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  sourceFilename?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePageQuery {
  page?: number;
  limit?: number;
  status?: ServicePageStatus;
  search?: string;
}

export interface ServicePageListEnvelope {
  success: boolean;
  data: ServicePageDto[];
  pagination: Pagination;
}
