import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Experience — Hong Kong Events",
  description:
    "An elegant, mobile-responsive event management platform based exclusively in Hong Kong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <PageTransition className="flex flex-col flex-1">
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
