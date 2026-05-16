import { prisma } from "@/lib/db";

export default async function WinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const wine = await prisma.wine.findUnique({
    where: { id: Number(id) },
  });

  if (!wine) return <p>Wine not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">{wine.name}</h1>
      <p className="text-gray-500 mb-4">{wine.type} · {wine.country} · {wine.region}</p>
      <p className="mb-4">{wine.description}</p>
      <p className="text-xl font-bold">${wine.price}</p>
      {wine.rating && <p className="mt-2">Rating: {wine.rating}/5</p>}
    </main>
  );
}