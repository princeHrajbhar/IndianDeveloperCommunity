"use client";
import { useParams } from "next/navigation";import { PMBacklogPage } from "@/src/components/product-management/backlog-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMBacklogPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
