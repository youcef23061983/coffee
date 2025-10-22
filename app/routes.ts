import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/__root.tsx", [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("products/:id", "routes/detail.tsx"),
    route("brands", "routes/brands.tsx"),
    route("quiz", "routes/quiz.tsx"),
    route("results", "routes/results.tsx"),
    route("testimonials", "routes/TestimonialsGrid.tsx"),
    route("about", "routes/about.tsx"),
    route("addTestimonial", "routes/AddTestimonial.tsx"),
  ]),
] satisfies RouteConfig;
