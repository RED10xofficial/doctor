import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Client component for the menu
function UserMenu({ user }: { user: Session["user"] }) {
  "use client";
  
  return (
    <Menu as="div" className="relative">
      <MenuButton className="px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
        {user?.name}
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
        <MenuItem>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-blue-50 text-blue-600" : "text-gray-700"
              } w-full text-left px-4 py-2`}
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

// Server component for the main navigation
export default async function Navigation() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="w-full absolute top-0 z-50 h-[50px] bg-white/50 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto h-full">
        <div className="w-full h-full flex justify-between items-center">
          <Link href="/home" className="text-primaryText text-2xl font-bold hover:text-primaryText/80 transition-colors">
            Study.io
          </Link>
          <UserMenu user={session.user} />
        </div>
      </div>
    </div>
  );
}
