// routes/__root.tsx
import * as React from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
