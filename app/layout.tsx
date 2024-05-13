import { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import AppLayout from "@/components/AppLayout";
import AppProvider from "@/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IP Address Manager",
  description: "IP Address Manager",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/assets/logo/logo.svg" />
      </head>

      <body className={inter.className}>
        <AppProvider>
          <AppLayout>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
