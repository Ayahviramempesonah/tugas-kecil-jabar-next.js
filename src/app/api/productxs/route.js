import { NextResponse } from "next/server";
import { product } from "@/app/lib/data";

export function GET(request, { params }) {
  return NextResponse.json({ product });
}
export async function POST(request) {
  try {
    const body = await request.json();

    // Validasi input
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // Buat produk baru
    const newProduct = {
      id: product.length + 1,
      name: body.name,
      email: body.email,
    };

    product.push(newProduct);

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: newProduct,
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
