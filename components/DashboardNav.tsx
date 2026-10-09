"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Users,
} from "lucide-react";

const adminLinks = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/restaurants",
    label: "Restaurants",
    icon: Store,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: Users,
  },
];

const vendorLinks = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/profile",
    label: "Restaurant Profile",
    icon: Store,
  },
];

export default function DashboardNav({
  role,
}: {
  role: "ADMIN" | "VENDOR";
}) {
  const pathname = usePathname();

  const links = role === "ADMIN" ? adminLinks : vendorLinks;

  return (
    <nav className="flex flex-col gap-[8px]">
      {links.map((link) => {
        const Icon = link.icon;

        const isActive =
          link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative flex items-center gap-[10px] px-[12px] py-[10px] rounded-s font-medium text-[0.95rem] transition-all duration-200 ${
            isActive
                ? "bg-dark/10 text-dark shadow-sm"
                : "text-ink/70 hover:text-ink hover:bg-black/[0.03] hover:translate-x-[2px]"
            }`}
          >
            <Icon
                className={`w-[18px] h-[18px] transition-transform duration-200 ${
                    isActive
                    ? "scale-105"
                    : "group-hover:scale-105"
                }`}
            />
            <span>{link.label}</span>
            {isActive && (
            <span className="absolute right-[8px] w-[4px] h-[20px] bg-dark rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}