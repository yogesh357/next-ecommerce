// 'use client'
//://////////
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BlackFridayBanner from "@/components/BlackFridayBanner"

export const dynamic = 'force-static'
export const revalidate = 60 // revalidate this page every 60 seconds

export default async function Home() {

  const products = await getAllProducts()
  const categories = await getAllCategories()

  console.log(
    crypto.randomUUID().slice(0, 5) +
    `>>> Rerendered the home page cache with ${products.length} products and ${categories.length} caegories`
  )

  return (
    <div>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />

      </div>

    </div>
  );
}
