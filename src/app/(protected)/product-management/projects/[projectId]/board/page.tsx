"use client";
import { useParams } from "next/navigation";import { PMBoardPage } from "@/src/components/product-management/board-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMBoardPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
