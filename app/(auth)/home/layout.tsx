"use client";
import { useProfile } from "@/app/components/ProfileContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setIsProfileExpanded, setIsSideMenuExpanded } = useProfile();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Small delay to ensure components are mounted
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Only expand on desktop
        setIsProfileExpanded(true);
        setIsSideMenuExpanded(true);
      }
      // On mobile, leave them collapsed (default state)
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, setIsProfileExpanded, setIsSideMenuExpanded, isMounted]);

  return <section>{children}</section>;
}
