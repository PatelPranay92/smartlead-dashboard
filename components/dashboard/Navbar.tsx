"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, Sun, Moon, ChevronDown, User, LogOut, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayout } from "./DashboardLayout";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ isDark, onToggleDark }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setMobileMenuOpen } = useLayout();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4 md:px-6 gap-2 md:gap-4 shadow-sm">
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-3 ml-auto">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User menu"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">Admin Patel</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
            <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", dropdownOpen && "rotate-180")} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden animate-in fade-in-0 slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin@smartlead.com</p>
              </div>
              <div className="py-2">

                <Link href="/login" className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


