import React from "react";
import { auth } from "@/lib/auth";
import ProfileToggle from "./ProfileToggle";
import apiClient, { ErrorResponse } from "@/lib/api";
import { ErrorInjector } from "./ErrorInjector";

// Function to get user's attended exams using the session-aware API client
async function getUserExams(userId: string) {
  try {
    const session = await auth();
    const { data: response } = await apiClient.get(
      `/auth/students/${userId}/exams?limit=3`,
      {
        headers: {
          token: session?.accessToken,
        },
      }
    );
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    } else {
      return { error: response.message, status: response.status };
    }
  } catch (err) {
    const e = err as ErrorResponse;
    return { error: e.message, status: e.status };
  }
}

const ProfileSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const userExams = userId ? await getUserExams(userId) : [];
  const { error, status } = userExams;
  return (
    <>
      <ProfileToggle session={session} userExams={userExams} />;
      <ErrorInjector error={error} status={status} />
    </>
  );
};

export default ProfileSidebar;
