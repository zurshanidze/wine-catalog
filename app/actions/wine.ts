"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function deleteWine(id: number) {
  await prisma.wine.delete({
    where: { id },
  });
  redirect("/");
}