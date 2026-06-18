import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuro Mori | Cinematic Scroll Experience",
  description:
    "A dark Japanese luxury editorial scroll experience with cinematic image transitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-black text-stone-100">{children}</body>
    </html>
  );
}
