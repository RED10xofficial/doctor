import Navigation from "../components/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navigation />
      <div className="mt-[50px] bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50">
        {children}
      </div>
    </section>
  );
}
