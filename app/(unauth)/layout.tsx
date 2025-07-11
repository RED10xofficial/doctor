import { SnackbarProvider } from "../components/Snackbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <section>{children}</section>
    </SnackbarProvider>
  );
}
