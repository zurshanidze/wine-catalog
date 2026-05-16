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
      <Link href="/" className="text-gray-500 hover:text-black mb-8 block text-sm">
        ← Back to catalog
      </Link>

      <div className="border rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
            {wine.type}
          </span>
          {wine.rating && (
            <span className="text-yellow-600 font-medium">★ {wine.rating} / 5</span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-2">{wine.name}</h1>
        <p className="text-gray-500 mb-6">
          {wine.country} {wine.region ? `· ${wine.region}` : ""}
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">{wine.description}</p>

        <p className="text-3xl font-bold mb-8">${wine.price}</p>

        <div className="flex gap-4 pt-6 border-t">
          <Link
            href={`/wine/${wine.id}/edit`}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Edit
          </Link>
          <form action={deleteWine.bind(null, wine.id)}>
            <button
              type="submit"
              className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}