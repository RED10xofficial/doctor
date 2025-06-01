"use client";

import React, { useEffect } from "react";
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

  // Immediately set the profile to collapsed on mount
  useEffect(() => {
    setIsProfileExpanded(false);
    setIsSideMenuExpanded(true);
  }, []); // Run only on mount

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
