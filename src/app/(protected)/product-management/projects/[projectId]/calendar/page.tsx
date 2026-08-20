"use client";
import { useParams } from "next/navigation";import { PMCalendarPage } from "@/src/components/product-management/calendar-page";export default function Page(){const p=useParams<{projectId:string}>();return <PMCalendarPage projectId={Array.isArray(p.projectId)?p.projectId[0]:p.projectId}/>}
