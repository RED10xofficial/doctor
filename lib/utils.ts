import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function getAllExamTypes() {
  const res = await fetcher(`${process.env.NEXT_PUBLIC_REST_URL}/examtypes`);
  return res.data
}