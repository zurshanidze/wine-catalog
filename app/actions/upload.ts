"use server";

import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";
import { uploadImage } from "@/lib/cloudinary";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return false;
  const payload = await verifySession(token);
  return payload?.role === "ADMIN";
}

export async function uploadWineImage(formData: FormData): Promise<string> {
  const isAdmin = await checkAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");
  if (!file.type.startsWith("image/")) throw new Error("File must be an image");

  const url = await uploadImage(file);
  return url;
}