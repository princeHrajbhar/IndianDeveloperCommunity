import type {Metadata} from "next";import type {ReactNode} from "react";import {RequireAuth} from "@/src/components/auth/require-auth";import {HRManagementShell} from "@/src/components/hr-management/hr-management-shell";
export const metadata:Metadata={title:"HR Management | Quantum Finix",description:"Quantum Finix Human Resources Management System",robots:{index:false,follow:false}};
export default function Layout({children}:{children:ReactNode}){return <RequireAuth><HRManagementShell>{children}</HRManagementShell></RequireAuth>}
