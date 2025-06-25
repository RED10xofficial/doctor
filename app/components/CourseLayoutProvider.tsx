"use client";

import React, { useEffect, useState } from "react";
import { useProfile } from "./ProfileContext";

export function CourseLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isProfileExpanded,
    setIsProfileExpanded,
    isSideMenuExpanded,
    setIsSideMenuExpanded,
  } = useProfile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set the profile and sidebar to collapsed for course pages
  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Only set collapsed state on desktop for course pages
        setIsProfileExpanded(false);
        setIsSideMenuExpanded(false);
      }
      // On mobile, don't override - they should stay collapsed by default
    }, 100);

    return () => clearTimeout(timer);
  }, [setIsProfileExpanded, setIsSideMenuExpanded, isMounted]);

  // Update document attribute for CSS targeting
  useEffect(() => {
    if (isProfileExpanded) {
      document.documentElement.setAttribute("data-profile-expanded", "true");
    } else {
      document.documentElement.setAttribute("data-profile-expanded", "false");
    }
  }, [isProfileExpanded]);

  // Update document attribute for sidemenu CSS targeting
  useEffect(() => {
    if (isSideMenuExpanded) {
      document.documentElement.setAttribute("data-sidemenu-expanded", "true");
    } else {
      document.documentElement.setAttribute("data-sidemenu-expanded", "false");
    }
  }, [isSideMenuExpanded]);

  return <>{children}</>;
}
