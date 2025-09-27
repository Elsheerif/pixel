import { apiServices } from "@/services/api";
import InnerCart from "./InnerCart";
import React from "react";

export default async function Cart() {
    const response = await apiServices.getUserCart();

    return (
        <div className="container mx-auto px-4 py-8">
            <InnerCart cartData={response}  />
        </div>
    );
}
