import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const wines = await prisma.wine.findMany();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Wine Catalog</h1>
      <div className="grid grid-cols-1 gap-4">
        {wines.map((wine) => (
          <Link href={`/wine/${wine.id}`} key={wine.id}>
            <div className="border rounded-lg p-4 hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{wine.name}</h2>
              <p className="text-gray-500">{wine.type} · {wine.country} · {wine.region}</p>
              <p className="mt-2">{wine.description}</p>
              <p className="mt-2 font-bold">${wine.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}