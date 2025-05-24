"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navigation() {
  const session = useSession();
  const user = session?.data?.user;
  return (
    <div className="w-full absolute top-0 z-50 h-[50px] bg-white/50 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto h-full px-8">
        <div className="w-full h-full flex justify-between items-center">
          <Link
            href="/home"
            className="text-primaryText text-2xl font-bold hover:text-primaryText/80 transition-colors"
          >
            Study.io
          </Link>
          <Menu as="div" className="relative">
            <MenuButton className="px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg">
              {session && <>{user?.name}</>}
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
        </div>
      </div>
    </div>
  );
}
