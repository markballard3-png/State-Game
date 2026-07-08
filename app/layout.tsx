import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capital Kickoff: NCAA State Stadium Challenge",
  description: "A desktop-first college-football themed states and capitals learning game."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
