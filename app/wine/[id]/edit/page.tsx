import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function updateWine(id: number, formData: FormData) {
  "use server";

  await prisma.wine.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      region: formData.get("region") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")),
    },
  });

  redirect(`/wine/${id}`);
}

export default async function EditWinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const wine = await prisma.wine.findUnique({
    where: { id: Number(id) },
  });

  if (!wine) return <p>Wine not found.</p>;

  const updateWineWithId = updateWine.bind(null, wine.id);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link href={`/wine/${wine.id}`} className="text-blue-500 hover:underline mb-6 block">← Back</Link>
      <h1 className="text-3xl font-bold mb-8">Edit {wine.name}</h1>
      <form action={updateWineWithId} className="flex flex-col gap-4">
        <input name="name" defaultValue={wine.name} className="border p-2 rounded" required />
        <input name="country" defaultValue={wine.country} className="border p-2 rounded" required />
        <input name="region" defaultValue={wine.region ?? ""} className="border p-2 rounded" />
        <input name="type" defaultValue={wine.type} className="border p-2 rounded" required />
        <textarea name="description" defaultValue={wine.description ?? ""} className="border p-2 rounded" />
        <input name="price" type="number" defaultValue={wine.price} className="border p-2 rounded" required />
        <input name="rating" type="number" step="0.1" defaultValue={wine.rating ?? ""} className="border p-2 rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">
          Save Changes
        </button>
      </form>
    </main>
  );
}