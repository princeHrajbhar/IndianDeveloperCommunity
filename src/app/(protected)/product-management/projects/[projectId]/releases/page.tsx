"use client";
import { useParams } from "next/navigation";import { PMReleasesPage } from "@/src/components/product-management/releases-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMReleasesPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
