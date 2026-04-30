"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Loader2, ArrowLeft, Send, Lock } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast("Please enter your email address.");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast("Reset link sent successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-gray-950">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[480px] lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-[360px]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-900 dark:text-white font-bold text-xl leading-none">SmartLead</p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide">CRM Pro</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Reset password
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
              {submitted 
                ? "We've sent a password reset link to your email." 
                : "Enter your email and we'll send you a link to reset your password."}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-shadow"
                    placeholder="admin@smartlead.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm shadow-indigo-200 dark:shadow-none text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send reset link
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl">
                <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium text-center">
                  Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="mt-8">
            <Link 
              href="/login" 
              className="flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to log in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image/Graphic */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 w-full h-full p-12 flex flex-col justify-between">
          <div className="absolute inset-0 z-0">
             {/* Abstract background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-400/20 blur-[100px]" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Secure your access.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              We take your data security seriously. Easily regain access to your SmartLead CRM account to continue managing your leads efficiently.
            </p>
          </div>

          <div className="relative z-10 w-full max-w-2xl ml-auto mt-12">
            <div className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-800/50 p-8 flex items-center justify-center">
              <div className="flex flex-col items-center text-center opacity-50">
                <Lock className="w-16 h-16 text-indigo-500 mb-4" />
                <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded-full mb-2" />
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


