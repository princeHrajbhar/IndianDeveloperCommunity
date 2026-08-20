import type { Metadata } from "next";import type { ReactNode } from "react";import { RequireAuth } from "@/src/components/auth/require-auth";import { ProductManagementShell } from "@/src/components/product-management/product-management-shell";
export const metadata:Metadata={title:"Product Management | QuantumFinix",description:"QuantumFinix Product Management workspace",robots:{index:false,follow:false}};
export default function Layout({children}:{children:ReactNode}){return <RequireAuth><ProductManagementShell>{children}</ProductManagementShell></RequireAuth>}
