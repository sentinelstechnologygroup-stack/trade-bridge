"use client";

import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "sonner";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}
