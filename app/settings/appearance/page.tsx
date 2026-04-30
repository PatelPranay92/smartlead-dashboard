"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Save, Sun, Moon, Monitor, Loader2 } from "lucide-react";
import { useLayout } from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/components/ui/Toast";

export default function AppearanceSettingsPage() {
  const { isDark, toggleDark } = useLayout();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("Appearance settings updated successfully.");
    }, 1000);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Select your preferred dashboard theme
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Light Theme */}
              <button 
                onClick={() => isDark && toggleDark()}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all ${
                  !isDark ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="w-full h-24 bg-gray-50 rounded-lg border border-gray-200 mb-3 overflow-hidden flex flex-col">
                  <div className="h-4 bg-white border-b border-gray-200" />
                  <div className="flex flex-1">
                    <div className="w-1/4 h-full bg-white border-r border-gray-200" />
                    <div className="flex-1 p-2 bg-gray-50">
                      <div className="w-full h-full bg-white rounded shadow-sm border border-gray-100" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className={`w-4 h-4 ${!isDark ? "text-indigo-600" : "text-gray-500"}`} />
                  <span className={`text-sm font-semibold ${!isDark ? "text-indigo-900 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"}`}>Light</span>
                </div>
              </button>

              {/* Dark Theme */}
              <button 
                onClick={() => !isDark && toggleDark()}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all ${
                  isDark ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="w-full h-24 bg-gray-950 rounded-lg border border-gray-800 mb-3 overflow-hidden flex flex-col">
                  <div className="h-4 bg-gray-900 border-b border-gray-800" />
                  <div className="flex flex-1">
                    <div className="w-1/4 h-full bg-gray-900 border-r border-gray-800" />
                    <div className="flex-1 p-2 bg-gray-950">
                      <div className="w-full h-full bg-gray-900 rounded shadow-sm border border-gray-800" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Moon className={`w-4 h-4 ${isDark ? "text-indigo-600" : "text-gray-500"}`} />
                  <span className={`text-sm font-semibold ${isDark ? "text-indigo-900 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300"}`}>Dark</span>
                </div>
              </button>

              {/* System Theme (Placeholder to look good) */}
              <button 
                className="flex flex-col items-start p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed"
                title="System theme sync coming soon"
              >
                <div className="w-full h-24 bg-gradient-to-r from-gray-50 to-gray-950 rounded-lg border border-gray-300 dark:border-gray-700 mb-3" />
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">System</span>
                </div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-200 dark:shadow-indigo-900"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}


