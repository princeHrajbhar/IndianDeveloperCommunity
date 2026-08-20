"use client";
import type { ReactNode } from "react";
import { ProductManagementShell } from "./product-management-shell";
export function ProductManagementApp({children}:{children:ReactNode}){return <ProductManagementShell>{children}</ProductManagementShell>}
