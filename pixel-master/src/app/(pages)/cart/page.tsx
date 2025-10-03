"use client";

import { apiServices } from "@/services/api";
import InnerCart from "./InnerCart";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GetUserCartResponse } from "@/interfaces/cart";
import { Loader2 } from "lucide-react";

export default function Cart() {
    const { data: session } = useSession();
    const [cartData, setCartData] = useState<GetUserCartResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.accessToken) {
            apiServices.getUserCart(session.accessToken).then(setCartData).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return (
            <div className="bg-orange-50 min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-orange-50">
            <div className="container mx-auto px-4 py-8">
                <InnerCart cartData={cartData} />
            </div>
        </div>
    );
}
