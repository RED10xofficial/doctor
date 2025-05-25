"use client";

import { useProfile } from "./ProfileContext";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isProfileExpanded } = useProfile();

  return (
    <div
      className={`ms-[210px] ${
        isProfileExpanded ? "me-[280px]" : "me-0"
      } bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 min-h-screen transition-all duration-300`}
    >
      {children}
    </div>
  );
}
