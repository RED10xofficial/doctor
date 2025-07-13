import Breadcrumb from "@/app/components/breadcrumb";
import { SnackbarProvider } from "@/app/components/Snackbar";
import { SessionProvider } from "./context/SessionContext";
import { CourseLayoutProvider } from "@/app/components/CourseLayoutProvider";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Session } from "next-auth";
import { Metadata } from "next";
import { ErrorProvider } from "@/app/components/ErrorContext";
import { ErrorSnackbar } from "@/app/components/ErrorSnackbar";

export const metadata: Metadata = {
  title: "Course Pages",
  description: "Course content and learning materials",
};

interface PageProps {
  session: Session;
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Clone the children and pass session as a prop
  const childrenWithSession = React.Children.map(children, (child) => {
    if (React.isValidElement<PageProps>(child)) {
      return React.cloneElement(child, { session });
    }
    return child;
  });

  return (
    <CourseLayoutProvider>
      <SessionProvider initialSession={session}>
        <SnackbarProvider>
          <ErrorProvider>
            <ErrorSnackbar />
            <section>
              <div className="p-4">
                <Breadcrumb />
              </div>
              {childrenWithSession}
            </section>
          </ErrorProvider>
        </SnackbarProvider>
      </SessionProvider>
    </CourseLayoutProvider>
  );
}
