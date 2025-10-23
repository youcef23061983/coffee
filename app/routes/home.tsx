import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

// Define the props type for Welcome
type WelcomeProps = {
  data: any[]; // Remove undefined
};
import { supabase } from "~/supabase_client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Coffee App" },
    { name: "description", content: "Welcome to React Coffee App!" },
  ];
}
export async function loader() {
  const { data, error } = await supabase
    .from("brands")
    .select(
      `
    *,
    coffee_products(*),
    equipment_products(*)
  `
    )
    .order("name");

  if (error) {
    return { error: error.message };
  }

  // Transform data to include products count
  const brandsWithProductCount = data?.map((brand) => ({
    ...brand,
    products_count: brand.coffee_products?.length || 0,
  }));

  return { data: brandsWithProductCount };
}

// export default function Home() {
export default function Home({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return <h1>hi</h1>;

  // return <Welcome data={data || []} />;
}
