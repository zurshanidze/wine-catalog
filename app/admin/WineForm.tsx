"use client";

import { useState } from "react";
import { addWine } from "@/app/actions/wine";
import { uploadWineImage } from "@/app/actions/upload";
import Image from "next/image";

export default function WineForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
    await addWine(formData);
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
          placeholder="e.g. Saperavi"
          className="border p-2 rounded-lg"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Region</label>
        <input
          name="region"
          placeholder="e.g. Kakheti"
          className="border p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Type *</label>
        <select name="type" className="border p-2 rounded-lg" required>
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
          placeholder="Describe the wine..."
          className="border p-2 rounded-lg h-24"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Price ($) *</label>
          <input
            name="price"
            type="number"
            placeholder="0"
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
            placeholder="0.0"
            className="border p-2 rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Wine Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded-lg"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={160}
            className="mt-2 h-40 object-cover rounded-lg"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 mt-2 disabled:bg-gray-400"
      >
        Add Wine
      </button>
    </form>
  );
}
