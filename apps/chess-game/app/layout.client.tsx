"use client";

import { Navbar } from "@/components/navbar";
import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Navbar />

      {children}
    </React.Fragment>
  );
}
