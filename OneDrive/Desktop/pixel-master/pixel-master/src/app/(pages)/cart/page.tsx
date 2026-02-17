'use client';

import { apiServices } from "@/services/api";
import InnerCart from "./InnerCart";
import React, { useEffect, useState } from "react";
import { GetUserCartResponse } from "@/interfaces/cart";
import { LoadingSpinner } from "@/components";
import { useSession } from "next-auth/react";

export default function Cart() {
    const [cartData, setCartData] = useState<GetUserCartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const token = (session?.user as any)?.accessToken;

    useEffect(() => {
        async function fetchCart() {
            try {
                setIsLoading(true);
                const response = await apiServices.getUserCart(token);
                setCartData(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load cart');
            } finally {
                setIsLoading(false);
            }
        }

        if (token) {
            fetchCart();
        }
    }, [token]);

    if (isLoading) {
        return (
            <div className="bg-orange-50 min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-orange-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-orange-50">
            <div className="container mx-auto px-4 py-8">
                {cartData && <InnerCart cartData={cartData} />}
            </div>
        </div>
    );
}
