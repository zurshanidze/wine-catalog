import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import { logout } from "@/app/actions/auth";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wine Catalog",
  description: "Discover and explore wines from around the world",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  return (
    <html lang="en">
      <body className={geist.className}>
        <nav className="border-b px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            🍷 Wine Catalog
          </Link>
          <div className="flex items-center gap-4">
            {session?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
              >
                + Add Wine
              </Link>
            )}
            {session ? (
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Logout
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-black"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
