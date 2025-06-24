"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useProfile } from "./ProfileContext";
import { useState, useEffect } from "react";

import {
  Home,
  CheckSquare,
  LogOut,
  Star,
  Book,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
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
  const {
    isSideMenuExpanded,
    setIsSideMenuExpanded,
    isProfileExpanded,
    setIsProfileExpanded,
  } = useProfile();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      // Close mobile menu when switching to desktop
      if (!isMobileDevice && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <Home size={isSideMenuExpanded ? 18 : 16} strokeWidth={1.5} />,
      activeColor: "#702DFF",
    },
    {
      name: "Sections",
      path: "/details",
      icon: <Book size={isSideMenuExpanded ? 18 : 16} strokeWidth={1.5} />,
    },
    {
      name: "My Exams",
      path: "/my-exams",
      icon: (
        <CheckSquare size={isSideMenuExpanded ? 18 : 16} strokeWidth={1.5} />
      ),
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
      icon: <LogOut size={isSideMenuExpanded ? 18 : 16} strokeWidth={1.5} />,
      activeColor: "#F13E3E",
      onClick: () => {
        signOut();
        setIsMobileMenuOpen(false);
      },
    },
  ];

  const toggleSidebar = () => {
    setIsSideMenuExpanded(!isSideMenuExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Don't render anything until we know if it's mobile or not to prevent flash
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobileMenu}
              className="w-8 h-8 flex items-center justify-center text-[#202020] hover:text-[#702DFF] transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#702DFF] flex items-center justify-center">
                <Star size={16} color="white" />
              </div>
              <div className="text-[#202020] font-semibold">
                <p className="font-extrabold text-transparent text-base bg-clip-text bg-gradient-to-r from-[#702DFF] via-[#7550FB] to-[#4A3AFF] uppercase leading-tight">
                  Study <span className="text-xs block">Catalyst</span>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Profile Button */}
          <button
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="w-8 h-8 flex items-center justify-center text-[#202020] hover:text-[#702DFF] transition-colors"
          >
            <User size={20} />
          </button>
        </header>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-[70] flex flex-col justify-between bg-white shadow-lg rounded-tl-[20px] rounded-bl-[20px] p-8 h-screen transition-all duration-300 ease-in-out overflow-hidden ${
          isMobile
            ? `w-[280px] ${
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : isSideMenuExpanded
            ? "w-[210px]"
            : "w-[80px]"
        }`}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#202020] hover:text-[#702DFF] transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        )}

        {/* Desktop Toggle Button - positioned outside the sidebar bounds */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`fixed top-6 w-6 h-6 bg-[#702DFF] rounded-full flex items-center justify-center shadow-md hover:bg-[#5a25d4] transition-all duration-300 ease-in-out z-[60] ${
              isSideMenuExpanded ? "left-[197px]" : "left-[67px]"
            }`}
          >
            {isSideMenuExpanded ? (
              <ChevronLeft size={14} color="white" />
            ) : (
              <ChevronRight size={14} color="white" />
            )}
          </button>
        )}

        <div className="flex flex-col gap-12">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mt-4">
            <div
              className={`w-10 h-10 rounded-full bg-[#702DFF] flex items-center justify-center flex-shrink-0 ${
                !isMobile && !isSideMenuExpanded ? "w-6 h-6" : "w-10 h-10"
              }`}
            >
              <Star
                size={!isMobile && !isSideMenuExpanded ? 16 : 20}
                color="white"
              />
            </div>
            {(isMobile || isSideMenuExpanded) && (
              <Link
                href={"/home"}
                className="text-[#202020] font-semibold text-lg whitespace-nowrap"
                onClick={() => isMobile && closeMobileMenu()}
              >
                <p className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-[#702DFF] via-[#7550FB] to-[#4A3AFF] uppercase">
                  Study <span className="text-sm block">Catalyst</span>
                </p>
              </Link>
            )}
          </div>

          {/* Overview Section */}
          <div className="flex flex-col gap-2.5">
            {(isMobile || isSideMenuExpanded) && (
              <div className="py-2">
                <h3 className="text-[#3F3F3F] text-base font-semibold uppercase whitespace-nowrap">
                  OVERVIEW
                </h3>
              </div>
            )}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <div key={item.name} className="relative">
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 py-2 rounded-full transition-colors ${
                        isActive
                          ? "text-[#702DFF]"
                          : "text-[#202020] hover:text-gray-600"
                      }`}
                      onMouseEnter={() =>
                        !isSideMenuExpanded &&
                        !isMobile &&
                        setHoveredItem(item.name)
                      }
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => isMobile && closeMobileMenu()}
                    >
                      <span
                        className={`flex-shrink-0 ${
                          isActive ? "text-[#702DFF]" : "text-[#202020]"
                        }`}
                      >
                        {item.icon}
                      </span>
                      {(isMobile || isSideMenuExpanded) && (
                        <span className="font-medium text-base whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Section */}
        <div className="flex flex-col gap-2.5">
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

              return (
                <div key={item.name} className="relative">
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="flex items-center gap-3 py-2 rounded-full transition-colors text-left w-full"
                      onMouseEnter={() =>
                        !isSideMenuExpanded &&
                        !isMobile &&
                        setHoveredItem(item.name)
                      }
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span
                        style={{ color: iconColor }}
                        className="flex-shrink-0"
                      >
                        {item.icon}
                      </span>
                      {(isMobile || isSideMenuExpanded) && (
                        <span
                          className="font-medium text-base whitespace-nowrap"
                          style={{ color: textColor }}
                        >
                          {item.name}
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      className="flex items-center gap-3 py-2 rounded-full transition-colors"
                      onMouseEnter={() =>
                        !isSideMenuExpanded &&
                        !isMobile &&
                        setHoveredItem(item.name)
                      }
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => isMobile && closeMobileMenu()}
                    >
                      <span
                        style={{ color: iconColor }}
                        className="flex-shrink-0"
                      >
                        {item.icon}
                      </span>
                      {(isMobile || isSideMenuExpanded) && (
                        <span
                          className="font-medium text-base whitespace-nowrap"
                          style={{ color: textColor }}
                        >
                          {item.name}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Desktop Tooltip container - outside sidebar */}
      {!isSideMenuExpanded && !isMobile && hoveredItem && (
        <div
          className="fixed left-[88px] bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-[80] pointer-events-none transition-opacity duration-200"
          style={{
            top:
              hoveredItem === "Logout"
                ? "calc(100vh - 80px)"
                : `${
                    120 +
                    navItems.findIndex((item) => item.name === hoveredItem) * 40
                  }px`,
          }}
        >
          {hoveredItem}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
