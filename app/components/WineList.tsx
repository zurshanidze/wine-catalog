"use client";
import Link from "next/link";
import React, { useState } from "react";

type Wine = {
  id: number;
  name: string;
  country: string;
  region: string | null;
  type: string;
  description: string | null;
  price: number;
  rating: number | null;
  createdAt: Date;
};

const WineList = ({ wines }: { wines: Wine[] }) => {
  const [search, setSearch] = useState("");

  const filteredWines = wines.filter((wine) =>
    wine.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Georgian Wines"
        style={{
          width: "100%",
          marginBottom: "40px",
          padding: "8px",
          border: "2px solid #bfdbfe",
          borderRadius: "12px",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWines.map((wine) => {
          return (
            <Link href={`/wine/${wine.id}`} key={wine.id}>
              <div className="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
                    {wine.type}
                  </span>
                  {wine.rating && (
                    <span className="text-sm text-yellow-600 font-medium">
                      ★ {wine.rating}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold mb-1">{wine.name}</h2>
                <p className="text-gray-500 text-sm mb-3">
                  {wine.country} {wine.region ? `· ${wine.region}` : ""}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {wine.description}
                </p>
                <p className="text-lg font-bold">${wine.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WineList;
