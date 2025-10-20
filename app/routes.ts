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
    route("quiz", "routes/quiz.tsx"),
    route("results", "routes/results.tsx"),
  ]),
] satisfies RouteConfig;
