import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SmartLead CRM Pro — Lead Management Dashboard",
  description:
    "A modern, responsive Lead Management Dashboard for tracking, managing and converting leads efficiently.",
  keywords: ["CRM", "Lead Management", "Dashboard", "SmartLead", "Sales Pipeline"],
  openGraph: {
    title: "SmartLead CRM Pro",
    description: "Manage your leads like a pro with SmartLead CRM.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}


