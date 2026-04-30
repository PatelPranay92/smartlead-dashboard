export type CallStatus = "New Lead" | "Follow Up" | "Not Interested" | "Converted";
export type DealStatus = "Open" | "Won" | "Lost";

export interface Lead {
  id: number;
  customerName: string;
  phoneNumber: string;
  productName: string;
  city: string;
  budget: string;
  quantity: number;
  leadSource: string;
  callStatus: string;
  dealStatus: string;
  callStartTime: string;
  callEndTime: string;
  callDuration: string;
  callRecordingLink: string;
  notes: string;
  createdAt: string;
}

export const leads: Lead[] = [
  {
    id: 1,
    customerName: "Acme Corp",
    phoneNumber: "+91-9876543210",
    productName: "Industrial Valves",
    city: "Mumbai",
    budget: "₹50,000",
    quantity: 100,
    leadSource: "SmartLead",
    callStatus: "Follow Up",
    dealStatus: "Open",
    callStartTime: "10:30 AM",
    callEndTime: "10:45 AM",
    callDuration: "15m",
    callRecordingLink: "#",
    notes: "Requires a custom quote for bulk order.",
    createdAt: "2026-04-29T10:00:00Z",
  },
  {
    id: 2,
    customerName: "TechNova Solutions",
    phoneNumber: "+91-8765432109",
    productName: "Server Racks",
    city: "Bengaluru",
    budget: "₹1,20,000",
    quantity: 50,
    leadSource: "Website",
    callStatus: "New Lead",
    dealStatus: "Open",
    callStartTime: "",
    callEndTime: "",
    callDuration: "",
    callRecordingLink: "",
    notes: "Immediate requirement.",
    createdAt: "2026-04-28T14:20:00Z",
  },
  {
    id: 3,
    customerName: "Global Trade Inc.",
    phoneNumber: "+91-7654321098",
    productName: "Packaging Material",
    city: "Delhi",
    budget: "₹30,000",
    quantity: 5000,
    leadSource: "Trade Show",
    callStatus: "Converted",
    dealStatus: "Won",
    callStartTime: "11:00 AM",
    callEndTime: "11:20 AM",
    callDuration: "20m",
    callRecordingLink: "#",
    notes: "Deal closed successfully.",
    createdAt: "2026-04-25T09:15:00Z",
  },
  {
    id: 4,
    customerName: "Sunrise Electronics",
    phoneNumber: "+91-6543210987",
    productName: "LED Displays",
    city: "Pune",
    budget: "₹75,000",
    quantity: 20,
    leadSource: "Referral",
    callStatus: "Not Interested",
    dealStatus: "Lost",
    callStartTime: "04:00 PM",
    callEndTime: "04:05 PM",
    callDuration: "5m",
    callRecordingLink: "#",
    notes: "Budget too low for our pricing.",
    createdAt: "2026-04-20T16:30:00Z",
  },
  {
    id: 5,
    customerName: "Apex Manufacturing",
    phoneNumber: "+91-5432109876",
    productName: "Safety Gear",
    city: "Ahmedabad",
    budget: "₹45,000",
    quantity: 200,
    leadSource: "SmartLead",
    callStatus: "Follow Up",
    dealStatus: "Open",
    callStartTime: "02:15 PM",
    callEndTime: "02:30 PM",
    callDuration: "15m",
    callRecordingLink: "#",
    notes: "Send product catalog.",
    createdAt: "2026-04-29T11:45:00Z",
  },
  {
    id: 6,
    customerName: "Zenith Enterprises",
    phoneNumber: "+91-4321098765",
    productName: "Office Furniture",
    city: "Chennai",
    budget: "₹2,50,000",
    quantity: 150,
    leadSource: "Email Campaign",
    callStatus: "New Lead",
    dealStatus: "Open",
    callStartTime: "",
    callEndTime: "",
    callDuration: "",
    callRecordingLink: "",
    notes: "Setting up a new office.",
    createdAt: "2026-04-29T12:00:00Z",
  }
];

export const statsData = {
  totalLeads: { value: "1,248", growth: 12.5 },
  newLeads: { value: "384", growth: 8.2 },
  convertedLeads: { value: "142", growth: 24.1 },
  lostLeads: { value: "28", growth: -4.3 },
};

export const leadsOverTime = [
  { month: "Jan", leads: 65 },
  { month: "Feb", leads: 85 },
  { month: "Mar", leads: 120 },
  { month: "Apr", leads: 95 },
  { month: "May", leads: 150 },
  { month: "Jun", leads: 180 },
];

export const leadsBySource = [
  { source: "SmartLead", count: 450 },
  { source: "Website", count: 320 },
  { source: "Referral", count: 180 },
  { source: "Trade Show", count: 120 },
  { source: "Email", count: 90 },
];

export const leadsByStatus = [
  { name: "Open", value: 384, color: "#3b82f6" },
  { name: "Won", value: 142, color: "#10b981" },
  { name: "Lost", value: 28, color: "#ef4444" },
];

export const leadQualityData = [
  { subject: "Budget", A: 120, B: 110, fullMark: 150 },
  { subject: "Intent", A: 98, B: 130, fullMark: 150 },
  { subject: "Response", A: 86, B: 130, fullMark: 150 },
  { subject: "Authority", A: 99, B: 100, fullMark: 150 },
  { subject: "Need", A: 85, B: 90, fullMark: 150 },
  { subject: "Timeline", A: 65, B: 85, fullMark: 150 },
];

export const conversionRateData = [
  { month: "Jan", leads: 400, rate: 24 },
  { month: "Feb", leads: 300, rate: 18 },
  { month: "Mar", leads: 200, rate: 29 },
  { month: "Apr", leads: 278, rate: 23 },
  { month: "May", leads: 189, rate: 20 },
  { month: "Jun", leads: 239, rate: 34 },
];
