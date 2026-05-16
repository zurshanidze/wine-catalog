import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wine Catalog",
  description: "Discover and explore wines from around the world",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <nav className="border-b px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">🍷 Wine Catalog</Link>
          <Link href="/admin" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
            + Add Wine
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}