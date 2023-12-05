import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Smash Food",
  description: "A fast-food point-of-sale web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen max-w-full bg-background font-sans antialiased",
          fontSans.variable,
          fontSans.className,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
