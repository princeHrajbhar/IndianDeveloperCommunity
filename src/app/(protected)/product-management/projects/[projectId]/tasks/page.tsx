"use client";
import { useParams } from "next/navigation";import { PMWorkItemsPage } from "@/src/components/product-management/work-items-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMWorkItemsPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
