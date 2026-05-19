import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muntasir Al Mamun | Blockchain & UAV Researcher",
  description:
    "Single-page portfolio of Muntasir Al Mamun featuring blockchain, UAV, and AirSim research and software projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
