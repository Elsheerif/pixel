"use client";

import { useEffect, useState } from "react";
import { Brand } from "@/interfaces";
import { BrandCard } from "@/components/brands/BrandCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    async function fetchBrands() {
        try {
            setLoading(true);
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
            const data = await response.json();
            setBrands(data.data as Brand[]);
        } catch (err) {
            setError("Failed to load brands. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBrands();
    }, []);



    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={fetchBrands}>Try Again</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-orange-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Brands</h1>
                    <p className="text-muted-foreground">
                        Explore our collection of trusted brands
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded-md">
                            <button
                                className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white rounded-md" : "bg-transparent text-gray-700 hover:bg-gray-100"} rounded-r-none font-poppins`}
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid className="h-4 w-4" />
                            </button>
                            <button
                                className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white rounded-md" : "bg-transparent text-gray-700 hover:bg-gray-100"} rounded-l-none font-poppins`}
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Brands Grid */}
                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div
                        className={`grid gap-6 ${viewMode === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                            : "grid-cols-1"
                            }`}
                    >
                        {brands.map((brand) => (
                            <BrandCard key={brand._id} item={brand} viewMode={viewMode} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}