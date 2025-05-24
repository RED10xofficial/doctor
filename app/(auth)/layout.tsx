import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Navigation from "../components/navigation";
import AuthProvider from "../components/AuthProvider";
import Sidebar from "../components/sidebar";
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
        <Sidebar />
        <Navigation />
        <div className="mt-[50px] bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50">
          {children}
        </div>
      </section>
    </AuthProvider>
  );
}
