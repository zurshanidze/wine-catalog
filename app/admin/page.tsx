import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

async function addWine(formData: FormData) {
  "use server";

  await prisma.wine.create({
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

  redirect("/");
}

export default function AdminPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Wine</h1>
      <form action={addWine} className="flex flex-col gap-4">
        <input name="name" placeholder="Wine name" className="border p-2 rounded" required />
        <input name="country" placeholder="Country" className="border p-2 rounded" required />
        <input name="region" placeholder="Region" className="border p-2 rounded" />
        <input name="type" placeholder="Type (Red/White/Orange)" className="border p-2 rounded" required />
        <textarea name="description" placeholder="Description" className="border p-2 rounded" />
        <input name="price" type="number" placeholder="Price" className="border p-2 rounded" required />
        <input name="rating" type="number" step="0.1" placeholder="Rating (0-5)" className="border p-2 rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">
          Add Wine
        </button>
      </form>
    </main>
  );
}