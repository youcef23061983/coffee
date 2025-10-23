// app/routes/detail.tsx
import { supabase } from "~/supabase_client";
import type { Route } from "./+types/detail";
import ProductDetail from "~/components/ProductDetail";
import { ClientOnly } from "~/components/ClientOnly";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    return { error: "Product not found." };
  }

  // Try to find product in both tables
  const [coffeeResult, equipmentResult] = await Promise.all([
    supabase
      .from("coffee_products")
      .select(`*, brands (name, description)`)
      .eq("id", id)
      .single(),
    supabase
      .from("equipment_products")
      .select(`*, brands (name, description)`)
      .eq("id", id)
      .single(),
  ]);

  let product = null;
  let type = null;

  if (coffeeResult.data) {
    product = coffeeResult.data;
    type = "coffee";
  } else if (equipmentResult.data) {
    product = equipmentResult.data;
    type = "equipment";
  } else {
    return { error: "Product not found in database." };
  }

  return {
    product,
    type,
  };
}

export default function ProductDetailPage({
  loaderData,
}: Route.ComponentProps) {
  // Add proper error handling and default values
  if (!loaderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
        </div>
      </div>
    );
  }

  // Ensure we have valid data before spreading
  const { product, type, error } = loaderData;

  if (error || !product || !type) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            {error || "The product could not be loaded."}
          </p>
        </div>
      </div>
    );
  }

  // Now we can safely spread the data
  return (
    <ClientOnly fallback={<p>Loading product...</p>}>
      <ProductDetail
        product={product}
        type={type as "coffee" | "equipment"}
        error={error}
      />
    </ClientOnly>
  );
}
