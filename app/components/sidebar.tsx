"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  Home,
  CheckSquare,
  LogOut,
  Star,
  Book,
} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  activeColor?: string;
  onClick?: () => void;
}

const Sidebar = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <Home size={16} strokeWidth={1.5} />,
      activeColor: "#702DFF",
    },
    {
      name: "Sections",
      path: "/details",
      icon: <Book size={16} strokeWidth={1.5} />,
    },
    {
      name: "My Exams",
      path: "/my-exams",
      icon: <CheckSquare size={16} strokeWidth={1.5} />,
    },
    // {
    //   name: "Group",
    //   path: "/group",
    //   icon: <Users size={16} strokeWidth={1.5} />,
    // },
  ];

  const settingsItems: NavItem[] = [
    // {
    //   name: "Settings",
    //   path: "/settings",
    //   icon: <Settings size={16} strokeWidth={1.5} />,
    // },
    {
      name: "Logout",
      path: "#",
      icon: <LogOut size={16} strokeWidth={1.5} />,
      activeColor: "#F13E3E",
      onClick: () => signOut(),
    },
  ];

  return (
    <aside className="w-[210px] fixed top-0 left-0 z-50 flex flex-col justify-between bg-white shadow-lg rounded-tl-[20px] rounded-bl-[20px] p-8 h-screen">
      <div className="flex flex-col gap-12">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#702DFF] flex items-center justify-center">
            <Star size={20} color="white" />
          </div>
          <span className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-[#702DFF] via-[#7550FB] to-[#4A3AFF] uppercase">
            Study.io
          </span>
        </div>

        {/* Overview Section */}
        <div className="flex flex-col gap-2.5">
          <div className="py-2">
            <h3 className="text-[#3F3F3F] text-base font-semibold uppercase">
              OVERVIEW
            </h3>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  href={item.path}
                  key={item.name}
                  className={`flex items-center gap-3 py-2 rounded-full transition-colors ${
                    isActive
                      ? "text-[#702DFF]"
                      : "text-[#202020] hover:text-gray-600"
                  }`}
                >
                  <span
                    className={isActive ? "text-[#702DFF]" : "text-[#202020]"}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium text-base">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Settings Section */}
      <div className="flex flex-col gap-2.5">
        {/* <div className="py-2">
          <h3 className="text-[#3F3F3F] text-base font-semibold uppercase">
            SETTINGS
          </h3>
        </div> */}
        <nav className="flex flex-col gap-2">
          {settingsItems.map((item) => {
            const isActive = pathname === item.path;
            const textColor = isActive
              ? item.activeColor || "#202020"
              : item.name === "Logout"
              ? "#F13E3E"
              : "#202020";
            const iconColor =
              item.name === "Logout"
                ? "#F13E3E"
                : isActive
                ? item.activeColor || "#202020"
                : "#202020";

            return item.onClick ? (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex items-center gap-3 py-2 rounded-full transition-colors text-left"
              >
                <span style={{ color: iconColor }}>{item.icon}</span>
                <span
                  className="font-medium text-base"
                  style={{ color: textColor }}
                >
                  {item.name}
                </span>
              </button>
            ) : (
              <Link
                href={item.path}
                key={item.name}
                className="flex items-center gap-3 py-2 rounded-full transition-colors"
              >
                <span style={{ color: iconColor }}>{item.icon}</span>
                <span
                  className="font-medium text-base"
                  style={{ color: textColor }}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
