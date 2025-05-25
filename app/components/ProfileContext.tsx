"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfileContextType {
  isProfileExpanded: boolean;
  setIsProfileExpanded: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  isProfileExpanded: true,
  setIsProfileExpanded: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isProfileExpanded, setIsProfileExpanded] = useState(true);

  // Update document attribute for CSS targeting
  useEffect(() => {
    if (isProfileExpanded) {
      document.documentElement.setAttribute("data-profile-expanded", "true");
    } else {
      document.documentElement.setAttribute("data-profile-expanded", "false");
    }
  }, [isProfileExpanded]);

  return (
    <ProfileContext.Provider
      value={{ isProfileExpanded, setIsProfileExpanded }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
