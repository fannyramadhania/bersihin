"use client";

import { PermifyProvider } from "@permify/react-role";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ReactQueryClientProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PermifyProvider>
        <Toaster />
        {children}
      </PermifyProvider>
    </QueryClientProvider>
  );
}
