"use client";

import { useState } from "react";
import Link from "next/link";
import { leads as initialLeads } from "@/lib/mock-data";
import { Badge, getCallStatusVariant, getDealStatusVariant, getSourceVariant } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Eye, Pencil, Trash2, Users, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const PAGE_SIZE = 5;

export default function LeadsTable() {
  const [localLeads, setLocalLeads] = useState(initialLeads);
  const [page, setPage] = useState(0);
  const { toast } = useToast();

  const totalPages = Math.ceil(localLeads.length / PAGE_SIZE);
  // Ensure page is within bounds after a deletion might reduce total pages
  const currentPage = Math.min(page, Math.max(0, totalPages - 1));
  const paginated = localLeads.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete the lead for ${name}?`)) {
      setLocalLeads((prev) => prev.filter((l) => l.id !== id));
      toast(`Lead "${name}" has been deleted.`);
    }
  };

  const handleEdit = (name: string) => {
    toast(`Editing lead: ${name}`);
  };

  const handleView = (name: string) => {
    toast(`Viewing details for: ${name}`);
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
        <CardHeader className="mb-0">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <CardTitle>Recent Leads</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">{localLeads.length} total</span>
            <Link href="/leads" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              View all →
            </Link>
          </div>
        </CardHeader>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              {["Customer", "Product", "City", "Budget", "Source", "Call Status", "Deal Status", "Call Info", "Recording", "Notes", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/80">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              paginated.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10 transition-colors group"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{lead.customerName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {lead.phoneNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                    <span className="font-medium">{lead.productName}</span>
                    <span className="text-gray-400 ml-1">(x{lead.quantity})</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                    {lead.city}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs font-medium">
                    {lead.budget}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={getSourceVariant(lead.leadSource)}>{lead.leadSource}</Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={getCallStatusVariant(lead.callStatus)}>{lead.callStatus}</Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={getDealStatusVariant(lead.dealStatus)}>{lead.dealStatus}</Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-900 dark:text-gray-300 font-medium">{lead.callDuration ? `${lead.callDuration} duration` : '-'}</span>
                      {(lead.callStartTime || lead.callEndTime) && (
                        <span className="text-[10px] text-gray-500">
                          {lead.callStartTime} - {lead.callEndTime}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap text-xs">
                    {lead.callRecordingLink && lead.callRecordingLink !== "#" && lead.callRecordingLink !== "" ? (
                      <a href={lead.callRecordingLink} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Listen
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs max-w-[150px] truncate" title={lead.notes}>
                    {lead.notes || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleView(lead.customerName)}
                        aria-label={`View ${lead.customerName}`}
                        className="p-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleEdit(lead.customerName)}
                        aria-label={`Edit ${lead.customerName}`}
                        className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id, lead.customerName)}
                        aria-label={`Delete ${lead.customerName}`}
                        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Showing {localLeads.length === 0 ? 0 : page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, localLeads.length)} of {localLeads.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-7 h-7 text-xs rounded-lg transition-colors ${
                i === page
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              aria-label={`Page ${i + 1}`}
              aria-current={i === page ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>
    </Card>
  );
}


