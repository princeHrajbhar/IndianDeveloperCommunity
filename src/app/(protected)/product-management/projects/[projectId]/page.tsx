"use client";
import { useParams } from "next/navigation";import { PMProjectOverviewPage } from "@/src/components/product-management/project-overview-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMProjectOverviewPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
