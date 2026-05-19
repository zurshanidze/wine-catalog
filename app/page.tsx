import { prisma } from "@/lib/db";
import WineList from "./components/WineList";

export default async function Home() {
  const wines = await prisma.wine.findMany();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Wine Catalog</h1>
      <p className="text-gray-500 mb-8">Discover wines from around the world</p>
        <WineList wines={wines} />
    </main>
  );
}