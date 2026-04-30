"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Lock, Moon } from "lucide-react";

const navItems = [
  { href: "/settings", label: "My Profile", icon: User },
  { href: "/settings/security", label: "Security & Passwords", icon: Lock },
  { href: "/settings/appearance", label: "Appearance", icon: Moon },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="md:col-span-1 space-y-1">
      {navItems.map((item) => {
        // We consider /settings active only if exactly /settings
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive 
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}


