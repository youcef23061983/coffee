// routes/__root.tsx
import * as React from "react";
import { Outlet } from "react-router";
import Navbar from "./navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* 👈 child routes render here */}
      </main>
    </div>
  );
}
