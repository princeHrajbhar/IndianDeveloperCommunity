"use client";
import { useParams } from "next/navigation";
import { PMActivityPage } from "@/src/components/product-management/activity-page";
export default function Page(){const {projectId}=useParams<{projectId:string}>();return <PMActivityPage projectId={projectId}/>;}
