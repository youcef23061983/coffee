import { ProtectedRoute } from "~/components/ProtectedRoute";
import AddTestimonial from "./AddTestimonial";

export default function ProtectedAddTestimonial() {
  return (
    <ProtectedRoute>
      <AddTestimonial />
    </ProtectedRoute>
  );
}
