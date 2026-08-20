"use client";
import { useParams } from "next/navigation";import { PMReportsPage } from "@/src/components/product-management/reports-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMReportsPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
