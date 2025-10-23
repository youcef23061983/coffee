// import * as React from "react";

// export function ClientOnly({
//   children,
//   fallback = null,
// }: {
//   children: () => React.ReactNode;
//   fallback?: React.ReactNode;
// }) {
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <>{fallback}</>;
//   }

//   return <>{children()}</>;
// }
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return fallback on server and during initial render
  if (!mounted) return <>{fallback}</>;

  return <>{children}</>;
}
