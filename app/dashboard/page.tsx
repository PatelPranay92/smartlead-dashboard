"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/dashboard/StatsCard";

import {
  LeadsBySourceChart,
  LeadStatusPieChart,
} from "@/components/dashboard/Charts";
import LeadsTable from "@/components/dashboard/LeadsTable";

import { statsData } from "@/lib/mock-data";
import { Users, UserPlus, UserCheck, UserX, Loader2, Plus } from "lucide-react";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [isLoading, setIsLoading] = useState(false);
  const [dailyStats, setDailyStats] = useState({ today: 0, yesterday: 0 });

  // Load and manage daily leads data using current time and localStorage
  useEffect(() => {
    const todayStr = new Date().toDateString();
    const stored = localStorage.getItem("smartlead_daily_stats");
                
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.date === todayStr) {
          // Same day, use existing stats
          setDailyStats({ today: parsed.today, yesterday: parsed.yesterday });
        } else {
          // New day: move old 'today' to 'yesterday' and start fresh
          const newData = {
            date: todayStr,
            today: Math.floor(Math.random() * 15) + 5, // simulate some initial leads for the new day
            yesterday: parsed.today
          };
          localStorage.setItem("smartlead_daily_stats", JSON.stringify(newData));
          setDailyStats({ today: newData.today, yesterday: newData.yesterday });
        }
      } catch (e) {
        // Fallback if parsing fails
      }
    } else {
      // First time initialization
      const initialData = {
        date: todayStr,
        today: 12,
        yesterday: 8
      };
      localStorage.setItem("smartlead_daily_stats", JSON.stringify(initialData));
      setDailyStats({ today: initialData.today, yesterday: initialData.yesterday });
    }
  }, []);

  // Simulate data fetching when date range changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [dateRange]);

  // Mock "filtered" stats based on date range
  const getStats = () => {
    const factor = dateRange === "This year" ? 4.5 : dateRange === "Last 90 days" ? 2.2 : 1;
    
    // Calculate dynamic growth for daily leads
    let dailyGrowth = 0;
    if (dailyStats.yesterday > 0) {
      dailyGrowth = ((dailyStats.today - dailyStats.yesterday) / dailyStats.yesterday) * 100;
    }

    return [
      {
        title: "Daily Leads",
        value: dailyStats.today.toString(),
        growth: parseFloat(dailyGrowth.toFixed(1)),
        icon: UserPlus,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100 dark:bg-blue-900/40",
      },
      {
        title: "Total Leads",
        value: (parseInt(statsData.totalLeads.value.replace(",", "")) * factor).toLocaleString(),
        growth: statsData.totalLeads.growth,
        icon: Users,
        iconColor: "text-indigo-600",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
      },
      {
        title: "Converted Leads",
        value: (parseInt(statsData.convertedLeads.value.replace(",", "")) * factor).toLocaleString(),
        growth: statsData.convertedLeads.growth,
        icon: UserCheck,
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
      },
      {
        title: "Lost Leads",
        value: (parseInt(statsData.lostLeads.value.replace(",", "")) * factor).toLocaleString(),
        growth: statsData.lostLeads.growth,
        icon: UserX,
        iconColor: "text-red-600",
        iconBg: "bg-red-100 dark:bg-red-900/40",
      },
    ];
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Welcome back, Admin. Showing data for <span className="font-bold text-indigo-600 dark:text-indigo-400">{dateRange}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            {isLoading && (
              <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              </div>
            )}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer hover:border-indigo-300 transition-colors"
              aria-label="Date range"
            >
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Top row charts */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        <LeadsBySourceChart />
        <LeadStatusPieChart />
      </div>

      {/* Table */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Lead Activity</h2>
        </div>
        <LeadsTable />
      </div>
    </div>
  );
}
