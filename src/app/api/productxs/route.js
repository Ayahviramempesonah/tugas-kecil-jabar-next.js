import { NextResponse } from "next/server";
import { product } from "@/app/lib/data";

export function GET(request, { params }) {
  return NextResponse.json({ product });
}
