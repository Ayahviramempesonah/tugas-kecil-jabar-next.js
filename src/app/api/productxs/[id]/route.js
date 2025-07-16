import { NextResponse } from "next/server";
import { product } from "@/app/lib/data";
// Data dummy untuk testing - idealnya ini dari database
// const products = [
//   {
//     id: 1,
//     name: "jamilah",
//     email: "wkwk@gmail.com",
//   },
//   {
//     id: 2,
//     name: "mulan",
//     email: "mul@gmail.com",
//   },
// ];

// Handler untuk GET request by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);

    // Cari produk berdasarkan ID
    const product = product.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: product,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// Handler untuk PUT request (update produk)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);
    const body = await request.json();

    // Cari index produk
    const productIndex = product.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update produk
    product[productIndex] = {
      ...product[productIndex],
      ...body,
    };

    return NextResponse.json({
      message: "Product updated successfully",
      product: product[productIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// Handler untuk DELETE request
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);

    // Cari index produk
    const productIndex = product.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Hapus produk
    const deletedProduct = product.splice(productIndex, 1)[0];

    return NextResponse.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
