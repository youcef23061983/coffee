import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/__root.tsx", [
    index("routes/home.tsx"),
    route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
    route("/:brandId", "routes/brands.tsx"),

    route("products", "routes/products.tsx"),
    route("products/:id", "routes/detail.tsx"),
    route("quiz", "routes/quiz.tsx"),
    route("results", "routes/results.tsx"),
    route("testimonials", "routes/TestimonialsGrid.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("addTestimonial", "routes/protected-addtestimonial.tsx"),
    route("auth/signup", "routes/auth/signUp.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("cart", "routes/protected-cart.tsx"),
    route("shipping", "routes/shipping.tsx"),
    route("payment", "routes/payment.tsx"),
    route("auth/forgot-password", "routes/auth/forgot-password.tsx"),
    route("order-success", "routes/order-success.tsx"),

    // ✅ ADD ALL YOUR API ROUTES
    route("api/create-payment-intent", "routes/api.create-payment-intent.ts"),
    route("api/send-grid-email", "routes/api.send-grid-email.ts"),
    route("api/send-order-sms", "routes/api.send-order-sms.ts"),
    route("api/generate-invoice", "routes/api.generate-invoice.ts"),
    route("api/send-whatsapp", "routes/api.send-whatsapp.ts"),
  ]),
] satisfies RouteConfig;
