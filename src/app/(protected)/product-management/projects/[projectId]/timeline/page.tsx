"use client";
import { useParams } from "next/navigation";import { PMTimelinePage } from "@/src/components/product-management/timeline-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMTimelinePage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
