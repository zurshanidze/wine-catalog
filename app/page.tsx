import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const wines = await prisma.wine.findMany();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Wine Catalog</h1>
      <p className="text-gray-500 mb-8">Discover wines from around the world</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wines.map((wine) => (
          <Link href={`/wine/${wine.id}`} key={wine.id}>
            <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
                  {wine.type}
                </span>
                {wine.rating && (
                  <span className="text-sm text-yellow-600 font-medium">
                    ★ {wine.rating}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-1">{wine.name}</h2>
              <p className="text-gray-500 text-sm mb-3">
                {wine.country} {wine.region ? `· ${wine.region}` : ""}
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{wine.description}</p>
              <p className="text-lg font-bold">${wine.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}