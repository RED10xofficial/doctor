import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function getAllExamTypes() {
  return prisma.examType.findMany({ select: { id: true, name: true } });
}