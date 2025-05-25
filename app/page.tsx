import ProfileSidebar from "./components/profile";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* @ts-expect-error Async Server Component */}
      <ProfileSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800">Main Content Area</h1>
        <p className="text-gray-600 mt-4">
          The profile sidebar is now implemented and ready to use!
        </p>
      </div>
    </div>
  );
}
