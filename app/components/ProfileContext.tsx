"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileContextType {
  isProfileExpanded: boolean;
  setIsProfileExpanded: (value: boolean) => void;
  isSideMenuExpanded: boolean;
  setIsSideMenuExpanded: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  isProfileExpanded: false,
  setIsProfileExpanded: () => {},
  isSideMenuExpanded: false,
  setIsSideMenuExpanded: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // Start with collapsed state to prevent issues
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(false);

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

  return (
    <ProfileContext.Provider
      value={{
        isProfileExpanded,
        setIsProfileExpanded,
        isSideMenuExpanded,
        setIsSideMenuExpanded,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
