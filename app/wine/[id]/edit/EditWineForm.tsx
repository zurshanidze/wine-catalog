"use client";

import { useState } from "react";
import Image from "next/image";
import { updateWine } from "@/app/actions/wine";
import { uploadWineImage } from "@/app/actions/upload";

type Wine = {
  id: number;
  name: string;
  region: string | null;
  type: string;
  description: string | null;
  price: number;
  rating: number | null;
  imageUrl: string | null;
};

export default function EditWineForm({ wine }: { wine: Wine }) {
  const [imageUrl, setImageUrl] = useState<string>(wine.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(wine.imageUrl ?? "");

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadWineImage(formData);
      setImageUrl(url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    formData.append("imageUrl", imageUrl);
    await updateWine(wine.id, formData);
  }

  return (
    <form
      action={handleSubmit}
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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Wine Image</label>
        {preview && (
          <Image
            src={preview}
            alt={wine.name}
            width={400}
            height={600}
            className="w-2/3 mx-auto h-80 object-cover rounded-lg mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded-lg"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 mt-2 disabled:bg-gray-400"
      >
        Save Changes
      </button>
    </form>
  );
}
