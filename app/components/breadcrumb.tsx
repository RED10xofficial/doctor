"use client";

import { ChevronsRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname?.split("/").filter((segment) => segment !== "");

  const formatLabel = (text: string) => {
    return text
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav aria-label="Breadcrumb" className="pb-3 px-4 pt-5">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/home"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
        </li>
        {segments?.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2 text-gray-400">
                <ChevronsRight />
              </span>
              {isLast ? (
                <span className="text-gray-900 font-medium text-sm">
                  {formatLabel(segment)}
                </span>
              ) : (
                <Link
                  href={path}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  {formatLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
