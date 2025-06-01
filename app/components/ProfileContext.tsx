"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileContextType {
  isProfileExpanded: boolean;
  setIsProfileExpanded: (value: boolean) => void;
  isSideMenuExpanded: boolean;
  setIsSideMenuExpanded: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  isProfileExpanded: true,
  setIsProfileExpanded: () => {},
  isSideMenuExpanded: true,
  setIsSideMenuExpanded: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isProfileExpanded, setIsProfileExpanded] = useState(true);
  const [isSideMenuExpanded, setIsSideMenuExpanded] = useState(true);

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
