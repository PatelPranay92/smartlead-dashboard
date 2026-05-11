"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@smartlead.com");
  const [password, setPassword] = useState("admin");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== "admin@smartlead.com" || password !== "admin") {
      toast("Invalid email or password. Hint: admin@smartlead.com / admin");
      return;
    }

    setLoading(true);

    // We create a valid-looking JWT for testing purposes
    const mockHeader = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const mockPayload = btoa(JSON.stringify({
      sub: email,
      role: "admin",
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
    }));
    const mockSignature = "simulated_signature_hash_987654321";
    const jwtToken = `${mockHeader}.${mockPayload}.${mockSignature}`;

    localStorage.setItem("token", jwtToken);

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      toast("Successfully logged in!");
      router.push("/dashboard");
    }, 1200);
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
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
              Please enter your details to sign in to your account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition-shadow"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me for 30 days
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm shadow-indigo-200 dark:shadow-none text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </>
              )}
            </button>
          </form>



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
              Supercharge your sales team.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              SmartLead CRM Pro helps you track leads, monitor conversions, and close deals faster with our comprehensive dashboard solution.
            </p>
          </div>

          <div className="relative z-10 w-full max-w-3xl ml-auto mt-12 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-800/50 p-6 overflow-hidden">
            {/* Mock Dashboard Preview */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse ml-auto" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}


