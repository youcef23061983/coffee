import { ProtectedRoute } from "~/components/ProtectedRoute";
import Cart from "./cart";

export default function ProtectedCart() {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
}
