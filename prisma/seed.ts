import "dotenv/config";
import { prisma } from "../lib/db";

async function main() {
  await prisma.wine.deleteMany();

  await prisma.wine.createMany({
      data: [
      {
        name: "Rkatsiteli",
        country: "Georgia",
        region: "Kakheti",
        type: "White",
        description: "Classic Georgian white wine with crisp acidity and floral aromas.",
        price: 15,
        rating: 4.2,
      },
      {
        name: "Saperavi",
        country: "Georgia",
        region: "Kakheti",
        type: "Red",
        description: "Rich dark Georgian red wine with deep color and bold tannins.",
        price: 18,
        rating: 4.5,
      },
      {
        name: "Chinuri",
        country: "Georgia",
        region: "Kartli",
        type: "White",
        description: "Light and fresh Georgian white wine with subtle citrus notes.",
        price: 12,
        rating: 4.0,
      },
      {
        name: "Mtsvane",
        country: "Georgia",
        region: "Kakheti",
        type: "White",
        description: "Aromatic Georgian white wine with notes of peach and honey.",
        price: 16,
        rating: 4.3,
      },
      {
        name: "Tavkveri",
        country: "Georgia",
        region: "Kartli",
        type: "Red",
        description: "Light-bodied Georgian red wine with cherry and spice notes.",
        price: 14,
        rating: 4.1,
      },
      {
        name: "Kisi",
        country: "Georgia",
        region: "Kakheti",
        type: "Orange",
        description: "Amber wine with rich texture and notes of dried fruit and nuts.",
        price: 22,
        rating: 4.4,
      },
      {
        name: "Krakhuna",
        country: "Georgia",
        region: "Imereti",
        type: "White",
        description: "Full-bodied Imeretian white wine with golden color and nutty finish.",
        price: 17,
        rating: 4.2,
      },
      {
        name: "Tsolikouri",
        country: "Georgia",
        region: "Imereti",
        type: "White",
        description: "Fresh and elegant Imeretian white wine with green apple notes.",
        price: 13,
        rating: 4.0,
      },
      {
        name: "Alexandrouli",
        country: "Georgia",
        region: "Racha",
        type: "Red",
        description: "Semi-sweet Rachuli red wine with raspberry and violet aromas.",
        price: 25,
        rating: 4.6,
      },
      {
        name: "Mujuretuli",
        country: "Georgia",
        region: "Racha",
        type: "Red",
        description: "Rare semi-sweet red wine from Racha region with deep ruby color.",
        price: 28,
        rating: 4.5,
      },
      {
        name: "Ojaleshi",
        country: "Georgia",
        region: "Samegrelo",
        type: "Red",
        description: "Elegant red wine from Samegrelo with pomegranate and plum notes.",
        price: 20,
        rating: 4.3,
      },
      {
        name: "Chkhaveri",
        country: "Georgia",
        region: "Guria",
        type: "Rosé",
        description: "Delicate Gurian rosé wine with fresh strawberry and floral notes.",
        price: 16,
        rating: 4.1,
      },
      {
        name: "Aladasturi",
        country: "Georgia",
        region: "Guria",
        type: "Red",
        description: "Rare Gurian red wine with light body and elegant berry aromas.",
        price: 19,
        rating: 4.2,
      },
      {
        name: "Khvanchkara",
        country: "Georgia",
        region: "Racha",
        type: "Red",
        description: "Famous semi-sweet red wine from Racha, made from Alexandrouli and Mujuretuli grapes.",
        price: 21,
        rating: 4.3,
      },
      {
        name: "Rkatsiteli Amber",
        country: "Georgia",
        region: "Kakheti",
        type: "Orange",
        description: "Traditional qvevri amber wine with tannins and dried apricot notes.",
        price: 24,
        rating: 4.4,
      },
    ],
  });

  console.log("Database seeded!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());




