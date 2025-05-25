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
      } min-h-screen transition-all duration-300`}
    >
      {children}
    </div>
  );
}
