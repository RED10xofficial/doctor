import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import dynamic from "next/dynamic";
// import Navigation from "../components/navigation";
import AuthProvider from "../components/AuthProvider";
import { ProfileProvider } from "../components/ProfileContext";
import ContentWrapper from "../components/ContentWrapper";
import { SidebarSkeleton, ProfileSkeleton } from "../(auth)/components/Skeleton";
import { PageTransition } from "../(auth)/components/PageTransition";

// Lazy load non-critical components
const Sidebar = dynamic(() => import("../components/sidebar"), {
  ssr: true,
  loading: () => <SidebarSkeleton />,
});

const ProfileSidebar = dynamic(() => import("../components/profile"), {
  ssr: true,
  loading: () => <ProfileSkeleton isCollapsed={false} />,
});

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
            <PageTransition>{children}</PageTransition>
          </ContentWrapper>
        </section>
      </ProfileProvider>
    </AuthProvider>
  );
}
