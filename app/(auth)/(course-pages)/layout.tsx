import Breadcrumb from "@/app/components/breadcrumb";
import { SnackbarProvider } from "@/app/components/Snackbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <section>
        <div className="max-w-7xl mx-auto pt-5">
          <Breadcrumb />
        </div>
        {children}
      </section>
    </SnackbarProvider>
  );
}
