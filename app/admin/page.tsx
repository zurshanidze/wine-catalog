import Link from "next/link";
import WineForm from "./WineForm";

export default function AdminPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link
        href="/"
        className="text-gray-500 hover:text-black mb-8 block text-sm"
      >
        ← Back to catalog
      </Link>
      <h1 className="text-3xl font-bold mb-8">Add New Wine</h1>
      <WineForm />
    </main>
  );
}
