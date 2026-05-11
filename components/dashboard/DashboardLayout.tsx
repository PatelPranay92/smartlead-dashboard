"use client";

import { useState, createContext, useContext, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

interface LayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  isDark: boolean;
  toggleDark: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  userName: string;
  setUserName: (v: string) => void;
  userAvatar: string | null;
  setUserAvatar: (v: string | null) => void;
  isMounted: boolean;
}

export const LayoutContext = createContext<LayoutContextType>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
  isDark: false,
  toggleDark: () => {},
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
  userName: "Admin",
  setUserName: () => {},
  userAvatar: null,
  setUserAvatar: () => {},
  isMounted: false,
});

export const useLayout = () => useContext(LayoutContext);

import { ToastProvider } from "@/components/ui/Toast";

import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserNameState] = useState("Admin");
  const [userAvatar, setUserAvatarState] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Load theme preference on mount
  useEffect(() => {
    try {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);

      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUserNameState(storedName);
      }

      const storedAvatar = localStorage.getItem("userAvatar");
      if (storedAvatar) {
        // Prevent massive base64 strings from crashing React DevTools or exceeding quota
        if (storedAvatar.length > 2000000) {
          localStorage.removeItem("userAvatar");
          console.warn("Avatar too large, removed from localStorage.");
        } else {
          setUserAvatarState(storedAvatar);
        }
      }
      setIsMounted(true);
    } catch (error) {
      console.error("Error accessing localStorage", error);
      setIsMounted(true);
    }
  }, []);

  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem("userName", name);
  };

  const setUserAvatar = (avatar: string | null) => {
    setUserAvatarState(avatar);
    if (avatar) {
      localStorage.setItem("userAvatar", avatar);
    } else {
      localStorage.removeItem("userAvatar");
    }
  };

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const isAuthPage = pathname === "/login" || pathname === "/forgot-password";

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed, isDark, toggleDark, mobileMenuOpen, setMobileMenuOpen, userName, setUserName, userAvatar, setUserAvatar, isMounted }}>
      <ToastProvider>
        {isAuthPage ? (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {children}
          </div>
        ) : (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex w-full relative">
            <Sidebar />
            <div
              className={`flex-1 transition-all duration-300 w-full min-w-0 ${sidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}
            >
              <Navbar isDark={isDark} onToggleDark={toggleDark} />
              <main className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">{children}</main>
            </div>
            {mobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
          </div>
        )}
      </ToastProvider>
    </LayoutContext.Provider>
  );
}


