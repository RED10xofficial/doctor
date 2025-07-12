import React from "react";
import { auth } from "@/lib/auth";
import { sessionApiClient } from "@/lib/session-api-client";
import { getErrorMessage } from "@/lib/api-utils";
import ProfileToggle from "./ProfileToggle";

// Function to get user's attended exams using the session-aware API client
async function getUserExams(userId: string) {
  try {
    const response = await sessionApiClient.getUserExams(userId, 3);
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    } else {
      console.error('Failed to fetch user exams:', getErrorMessage(response));
      return [];
    }
  } catch (error) {
    console.error('Network error fetching user exams:', error);
    return [];
  }
}

const ProfileSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  // Get user's exams if logged in
  const userExams = userId ? await getUserExams(userId) : [];

  // Return the profile toggle component with profile content
  return <ProfileToggle session={session} userExams={userExams} />;
};

export default ProfileSidebar;
