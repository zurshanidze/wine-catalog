import "dotenv/config";
import { prisma } from "../lib/db";

async function main() {
  await prisma.wine.createMany({
    data: [
      {
        name: "Rkatsiteli",
        country: "Georgia",
        region: "Kakheti",
        type: "White",
        description: "Classic Georgian white wine with crisp acidity.",
        price: 15,
        rating: 4.2,
      },
      {
        name: "Saperavi",
        country: "Georgia",
        region: "Kakheti",
        type: "Red",
        description: "Rich dark Georgian red wine with deep color.",
        price: 18,
        rating: 4.5,
      },
      {
        name: "Chinuri",
        country: "Georgia",
        region: "Kartli",
        type: "White",
        description: "Light and fresh Georgian white wine.",
        price: 12,
        rating: 4.0,
      },
    ],
  });
  console.log("Database seeded!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());