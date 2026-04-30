import LeadsTable from "@/components/dashboard/LeadsTable";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          View and manage all your leads.
        </p>
      </div>

      <LeadsTable />
    </div>
  );
}


