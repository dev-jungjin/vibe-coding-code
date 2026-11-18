import type { Metadata } from "next";
import { COURSE } from "@/lib/course";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: `${COURSE.title} | Day ${COURSE.day}`,
  description: COURSE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main className="page-main">{children}</main>
      </body>
    </html>
  );
}
