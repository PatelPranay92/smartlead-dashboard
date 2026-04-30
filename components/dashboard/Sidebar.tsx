"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayout } from "./DashboardLayout";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { sidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed, mobileMenuOpen, setMobileMenuOpen } = useLayout();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-900 transition-all duration-300 ease-in-out flex flex-col shadow-sm dark:shadow-none",
        collapsed ? "md:w-16 w-64" : "w-64",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center py-5 border-b border-gray-100 dark:border-gray-800 whitespace-nowrap overflow-hidden transition-all duration-300", collapsed ? "px-4 justify-center" : "px-4 justify-start")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div className={cn("transition-all duration-300 overflow-hidden flex flex-col justify-center", collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[150px] opacity-100 ml-2")}>
          <p className="text-gray-900 dark:text-white font-bold text-sm leading-none">SmartLead</p>
          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-medium mt-0.5">CRM Pro</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav 
        className={cn(
          "flex-1 py-6 space-y-1 overflow-x-hidden",
          collapsed ? "px-2" : "px-3 overflow-y-auto"
        )} 
        role="navigation" 
        aria-label="Main navigation"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (mobileMenuOpen) {
                  // Wait a tick or two so Next.js starts routing before sliding out
                  setTimeout(() => setMobileMenuOpen(false), 50);
                }
              }}
              className={cn(
                "flex items-center rounded-xl transition-all duration-300 group relative whitespace-nowrap",
                collapsed ? "justify-center p-3" : "px-3 py-2.5",
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                )}
              />
              <span className={cn("text-sm font-medium transition-all duration-300 overflow-hidden", collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[150px] opacity-100 ml-3")}>
                {label}
              </span>
              
              <div className={cn("transition-all duration-300 overflow-hidden flex items-center", (isActive && !collapsed) ? "max-w-[10px] ml-auto opacity-100" : "max-w-0 opacity-0 ml-0")}>
                <span className="block w-1.5 h-1.5 rounded-full bg-indigo-300 flex-shrink-0" />
              </div>

              {collapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-gray-200 dark:border-gray-700">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Toggle */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 mt-auto hidden md:flex overflow-hidden">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors whitespace-nowrap w-full",
            collapsed ? "justify-center" : "justify-start px-3"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5 flex-shrink-0" /> : <ChevronLeft className="w-5 h-5 flex-shrink-0" />}
          <span className={cn("text-sm font-medium transition-all duration-300 overflow-hidden", collapsed ? "max-w-0 opacity-0 ml-0" : "max-w-[100px] opacity-100 ml-3")}>
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}


