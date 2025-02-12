import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yale Startup Directory",
  description: "Directory of startups from the Yale ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics mode="production" />;
      </body>
    </html>
  );
}
