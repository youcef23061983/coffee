import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/__root.tsx", [
    index("routes/home.tsx"),
    route("/:brandId", "routes/brands.tsx"),

    route("products", "routes/products.tsx"),
    route("products/:id", "routes/detail.tsx"),
    route("quiz", "routes/quiz.tsx"),
    route("results", "routes/results.tsx"),
    route("testimonials", "routes/TestimonialsGrid.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("addTestimonial", "routes/AddTestimonial.tsx"),
    route("auth/signup", "routes/auth/signUp.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("auth/forgot-password", "routes/auth/forgot-password.tsx"),
  ]),
] satisfies RouteConfig;
