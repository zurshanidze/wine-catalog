import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import EditWineForm from "./EditWineForm";

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

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link
        href={`/wine/${wine.id}`}
        className="text-gray-500 hover:text-black mb-8 block text-sm"
      >
        ← Back
      </Link>
      <h1 className="text-3xl font-bold mb-8">Edit {wine.name}</h1>
      <EditWineForm wine={wine} />
    </main>
  );
}
