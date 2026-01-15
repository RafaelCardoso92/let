import { NextResponse } from "next/server";
import { getProducts, getProductsByCategory } from "@/lib/sanity";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured") === "true";
    
    let products;
    
    if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await getProducts({ featured, available: true });
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
