import Breadcrumb from "@/app/components/breadcrumb";
import { SnackbarProvider } from "@/app/components/Snackbar";
import { SessionProvider } from "./context/SessionContext";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Session } from "next-auth";

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
    <SessionProvider initialSession={session}>
      <SnackbarProvider>
        <section>
          <div className="max-w-screen-2xl mx-auto">
            <Breadcrumb />
          </div>
          {childrenWithSession}
        </section>
      </SnackbarProvider>
    </SessionProvider>
  );
}
