import { LeadsBySourceChart, LeadStatusPieChart } from "@/components/dashboard/Charts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Deep dive into your lead generation and conversion metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LeadsBySourceChart />
        <LeadStatusPieChart />
      </div>
    </div>
  );
}


