import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Navigation from "../components/navigation";
import AuthProvider from "../components/AuthProvider";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <AuthProvider>
      <section>
        <Navigation />
        <div className="mt-[50px] bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 min-h-screen">
          {children}
        </div>
      </section>
    </AuthProvider>
  );
}
