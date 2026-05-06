"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Lead } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart2, PieChart as PieIcon } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const STATUS_COLORS: Record<string, string> = {
  Open: "#3b82f6",
  Won: "#10b981",
  Lost: "#ef4444",
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color?: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </p>
        <div className="space-y-2">
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color || "#6366f1" }}
              />
              <p className="text-sm font-black text-gray-900 dark:text-white tabular-nums">
                {item.value}
                <span className="text-[10px] font-medium text-gray-500 ml-1">
                  {item.name}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

/** Derives leadsBySource counts from raw Lead array */
function buildSourceData(leads: Lead[]) {
  const map: Record<string, number> = {};
  for (const lead of leads) {
    map[lead.leadSource] = (map[lead.leadSource] ?? 0) + 1;
  }
  return Object.entries(map)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

/** Derives leadsByStatus counts from raw Lead array */
function buildStatusData(leads: Lead[]) {
  const map: Record<string, number> = {};
  for (const lead of leads) {
    map[lead.dealStatus] = (map[lead.dealStatus] ?? 0) + 1;
  }
  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
    color: STATUS_COLORS[name] ?? "#6366f1",
  }));
}

/** Shared hook: fetch leads once and derive chart data */
function useChartData() {
  const [leadsBySource, setLeadsBySource] = useState<{ source: string; count: number }[]>([]);
  const [leadsByStatus, setLeadsByStatus] = useState<{ name: string; value: number; color: string }[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BASE_URL}/leads`);
        if (!res.ok) return;
        const data = await res.json();
        const rawLeads = data.leads || [];
        
        // Map backend snake_case to frontend camelCase
        const normalizedLeads: Lead[] = rawLeads.map((l: any) => ({
          ...l,
          leadSource: l.lead_source || l.leadSource,
          dealStatus: l.deal_status || l.dealStatus,
        }));

        setLeadsBySource(buildSourceData(normalizedLeads));
        setLeadsByStatus(buildStatusData(normalizedLeads));
      } catch {
        // Charts silently stay empty on error
      }
    };
    load();
  }, []);

  return { leadsBySource, leadsByStatus };
}

export function LeadsBySourceChart() {
  const { leadsBySource } = useChartData();

  return (
    <Card className="group">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <BarChart2 className="w-4 h-4" />
          </div>
          <CardTitle>Distribution by Source</CardTitle>
        </div>
      </CardHeader>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={leadsBySource}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            horizontal={true}
            vertical={false}
            opacity={0.3}
          />
          <XAxis type="number" hide />
          <YAxis
            dataKey="source"
            type="category"
            tick={{ fontSize: 11, fontWeight: 600, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            fill="url(#barGrad)"
            radius={[0, 6, 6, 0]}
            barSize={24}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function LeadStatusPieChart() {
  const { leadsByStatus } = useChartData();

  return (
    <Card className="group">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
            <PieIcon className="w-4 h-4" />
          </div>
          <CardTitle>Conversion Funnel</CardTitle>
        </div>
      </CardHeader>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={leadsByStatus}
            cx="50%"
            cy="50%"
            outerRadius={85}
            innerRadius={60}
            paddingAngle={6}
            dataKey="value"
            animationDuration={1800}
            stroke="none"
          >
            {leadsByStatus.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))" }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              padding: "12px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1">
                {value}
              </span>
            )}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
