import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Handler untuk GET request by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          message: "DATABASE_URL tidak ditemukan",
        },
        {
          status: 500,
        },
      );
    }
    const sql = neon(process.env.DATABASE_URL);
    const product = sql`SELECT * FROM "Product" WHERE id=${id} `;

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: product[0],
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
    // const productId = parseInt(id);
    const body = await request.json();
    const { name, email } = body;
    if (!name && !email) {
      return NextResponse.json(
        {
          message: "name dan email harus diisi",
        },
        {
          status: 400,
        },
      );
    }
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          message: "DATABASE_URL tidak ditemukan",
        },
        {
          status: 500,
        },
      );
    }

    const sql = neon(process.env.DATABASE_URL);
    const updateProduct =
      await sql`UPDATE "Product" SET name =${name},email=${email} WHERE id = ${id} RETURNING * `;

    if (updateProduct === 0) {
      return NextResponse.json(
        {
          message: "product tidak ditemukan untuk di update",
        },
        {
          status: 404,
        },
      );
    }
    // if (productIndex === -1) {
    //   return NextResponse.json({ error: "Product not found" }, { status: 404 });
    // }

    return NextResponse.json({
      message: "Product updated successfully",
      product: updateProduct[0],
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

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          message: "DATABASE_URL tidak ditemukan",
        },
        {
          status: 500,
        },
      );
    }

    const sql = neon(process.env.DATABASE_URL);
    const deletedProduct =
      await sql` DELETE FROM "Product" WHERE id = ${id} RETURNING *`;

    if (deletedProduct === 0) {
      return NextResponse.json(
        { message: "tidak ada produk untuk dihapus" },
        { status: 404 },
      );
    }

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
