import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    products: [
      {
        id: 45,
        name: "Hockey",
        category: "sport",
        nationalGame: "pakistan",
      },
      {
        id: 46,
        name: "Tagg of war",
        category: "sport",
        nationalGame: "pakistan",
      },
      {
        id: 47,
        name: "Baskitball",
        category: "sport",
        nationalGame: "pakistan",
      },
      {
        id: 48,
        name: "Football",
        category: "sport",
        nationalGame: "pakistan",
      },
      {
        id: 49,
        name: "Bat",
        category: "sport",
        nationalGame: "pakistan",
      },
    ],
  });
}
