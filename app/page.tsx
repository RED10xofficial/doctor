import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        <p className="mt-4">
          Welcome to your dashboard. This is a sample content area that would
          contain your main application content.
        </p>
      </div>
    </main>
  );
}
