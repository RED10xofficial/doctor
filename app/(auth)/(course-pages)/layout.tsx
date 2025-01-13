import Breadcrumb from "@/app/components/breadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="max-w-7xl mx-auto pt-5">
        <Breadcrumb />
      </div>
      {children}
    </section>
  );
}
