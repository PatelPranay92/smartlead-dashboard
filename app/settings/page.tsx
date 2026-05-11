"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Save, Loader2, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useLayout } from "@/components/dashboard/DashboardLayout";

export default function ProfileSettingsPage() {
  const { toast } = useToast();
  const { userName, setUserName, userAvatar, setUserAvatar, isMounted } = useLayout();
  const [localName, setLocalName] = useState(userName);
  const [localAvatar, setLocalAvatar] = useState<string | null>(userAvatar);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalName(userName);
  }, [userName]);

  useEffect(() => {
    setLocalAvatar(userAvatar);
  }, [userAvatar]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_SIZE = 256;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
          setLocalAvatar(compressedDataUrl);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setUserName(localName);
      setUserAvatar(localAvatar);
      setLoading(false);
      toast("Profile settings updated successfully.");
    }, 1000);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-md overflow-hidden relative group transition-opacity duration-300 ${isMounted ? "opacity-100" : "opacity-0"}`}>
              {localAvatar ? (
                <img src={localAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <input 
                type="file" 
                id="avatar-upload" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
              <label 
                htmlFor="avatar-upload" 
                className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Change Avatar
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Full Name</label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Email Address</label>
              <input
                type="email"
                defaultValue="Admin@smartlead.com"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                disabled
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Role</label>
              <input
                type="text"
                defaultValue="Administrator"
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <Link 
          href="/login" 
          className="flex items-center gap-2 px-5 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-semibold rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Link>
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


