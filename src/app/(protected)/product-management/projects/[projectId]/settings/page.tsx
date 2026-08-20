"use client";
import { useParams } from "next/navigation";import { PMProjectSettingsPage } from "@/src/components/product-management/project-settings-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMProjectSettingsPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
