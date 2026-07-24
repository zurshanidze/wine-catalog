"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return false;
  const payload = await verifySession(token);
  return payload?.role === "ADMIN";
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
      imageUrl: (formData.get("imageUrl") as string) || null,
    },
  });
  redirect("/");
}

export async function updateWine(id: number, formData: FormData) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) redirect("/");

  await prisma.wine.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      country: "Georgia",
      region: formData.get("region") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")),
      imageUrl: (formData.get("imageUrl") as string) || null,
    },
  });
  redirect(`/wine/${id}`);
}

export async function deleteWine(id: number) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) redirect("/");

  // ჯერ ღვინოს ვპოულობთ imageUrl-ის მისაღებად
  const wine = await prisma.wine.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  // მონაცემთა ბაზიდან წაშლა
  await prisma.wine.delete({
    where: { id },
  });

  // Cloudinary-დან სურათის წაშლა
  if (wine?.imageUrl) {
    const publicId = wine.imageUrl
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  }

  redirect("/");
}