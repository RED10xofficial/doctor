import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
// import Navigation from "../components/navigation";
import AuthProvider from "../components/AuthProvider";
import Sidebar from "../components/sidebar";
import ProfileSidebar from "../components/profile";
import { ProfileProvider } from "../components/ProfileContext";
import ContentWrapper from "../components/ContentWrapper";

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
      <ProfileProvider>
        <section>
          <Sidebar />
          <ProfileSidebar />
          {/* <Navigation /> */}
          <ContentWrapper>
            <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 min-h-screen">
              {children}
            </div>
          </ContentWrapper>
        </section>
      </ProfileProvider>
    </AuthProvider>
  );
}
