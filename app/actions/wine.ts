"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return false;
  const payload = await verifySession(token);
  return payload?.role === "ADMIN";
}

export async function deleteWine(id: number) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) redirect("/");

  await prisma.wine.delete({
    where: { id },
  });
  redirect("/");
}

export async function addWine(formData: FormData) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) redirect("/");

  await prisma.wine.create({
    data: {
      name: formData.get("name") as string,
      country: "Georgia",
      region: formData.get("region") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")),
    },
  });
  redirect("/");
}