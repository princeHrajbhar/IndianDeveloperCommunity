"use client";
import { useParams } from "next/navigation";import { PMSprintsPage } from "@/src/components/product-management/sprints-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMSprintsPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
