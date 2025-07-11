"use client";

import { useProfile } from "./ProfileContext";
import { useState, useEffect } from "react";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isProfileExpanded, isSideMenuExpanded } = useProfile();
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`${!isMobile && isProfileExpanded ? "me-[280px]" : "me-0"} ${
        isMobile
          ? "ms-0 pt-16" // On mobile: no margins, top padding for header
          : isSideMenuExpanded
          ? "ms-[210px]"
          : "ms-20"
      } bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 min-h-screen transition-all duration-300`}
    >
      {children}
    </div>
  );
}
