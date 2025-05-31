import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

interface SessionWrapperProps {
  children: (session: Session) => React.ReactNode;
}

export default async function SessionWrapper({ children }: SessionWrapperProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <>{children(session)}</>;
} 