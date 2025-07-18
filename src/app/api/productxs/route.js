import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(request, { params }) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          message: "DATABASE_URL tidak ditemukan divariable",
        },
        { status: 500 },
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    const product = await sql`SELECT * FROM  "Product"  `;

    return NextResponse.json(product);
  } catch (error) {
    console.error("gagal mengambil data dari server");
    return NextResponse.json(
      { message: "gagal mengambil data dari server" },
      { status: 500 },
    );
  }

  // const product = await sql`SELECT * FROM  "Product"  `;

  // return NextResponse.json(product);
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validasi input
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          message: "DATABASE_URL tidak ditemukan divariable",
        },
        { status: 500 },
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    const newProduct = await sql`INSERT INTO "Product" ("name","email")
VALUES (${name},${email}) RETURNING *

`;

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: newProduct[0],
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
