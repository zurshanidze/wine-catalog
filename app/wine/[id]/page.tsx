import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteWine } from "@/app/actions/wine";

export default async function WinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const wine = await prisma.wine.findUnique({
    where: { id: Number(id) },
  });

  if (!wine) return <p>Wine not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link href="/" className="text-blue-500 hover:underline mb-6 block">← Back to catalog</Link>
      <h1 className="text-3xl font-bold mb-2">{wine.name}</h1>
      <p className="text-gray-500 mb-4">{wine.type} · {wine.country} · {wine.region}</p>
      <p className="mb-4">{wine.description}</p>
      <p className="text-xl font-bold">${wine.price}</p>
      {wine.rating && <p className="mt-2">Rating: {wine.rating}/5</p>}

       <div className="mt-8 flex gap-4">
       <Link href={`/wine/${wine.id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Wine
       </Link>
       <form action={deleteWine.bind(null, wine.id)}>
         <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Wine
         </button>
        </form>
       </div>
    </main>
  );
}