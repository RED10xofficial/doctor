"use client";
import { useProfile } from "@/app/components/ProfileContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setIsProfileExpanded, setIsSideMenuExpanded } = useProfile();
  const pathname = usePathname();

  useEffect(() => {
    setIsProfileExpanded(true);
    setIsSideMenuExpanded(true);
  }, [pathname, setIsProfileExpanded, setIsSideMenuExpanded]);

  return <section>{children}</section>;
}
