"use client"

import { SessionProvider } from "next-auth/react";
import CartContextProvider from "@/contexts/cartContext";
import toast, { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        {children}
        <Toaster />
      </CartContextProvider>
    </SessionProvider>
  );
}
