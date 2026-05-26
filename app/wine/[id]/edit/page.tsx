import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import { updateWine } from "@/app/actions/wine";

export default async function EditWinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  if (session?.role !== "ADMIN") redirect("/");

  const wine = await prisma.wine.findUnique({
    where: { id: Number(id) },
  });

  if (!wine) return <p>Wine not found.</p>;

  const updateWineWithId = updateWine.bind(null, wine.id);

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link
        href={`/wine/${wine.id}`}
        className="text-gray-500 hover:text-black mb-8 block text-sm"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-8">Edit {wine.name}</h1>
      <form
        action={updateWineWithId}
        className="border rounded-xl p-8 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Wine Name *</label>
          <input
            name="name"
            defaultValue={wine.name}
            className="border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Region</label>
          <input
            name="region"
            defaultValue={wine.region ?? ""}
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Type *</label>
          <select
            name="type"
            defaultValue={wine.type}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select type</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Orange">Orange</option>
            <option value="Rosé">Rosé</option>
            <option value="Sparkling">Sparkling</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={wine.description ?? ""}
            className="border p-2 rounded-lg h-24"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Price ($) *</label>
            <input
              name="price"
              type="number"
              defaultValue={wine.price}
              className="border p-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Rating (0-5)</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              defaultValue={wine.rating ?? ""}
              className="border p-2 rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 mt-2"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
