"use client";

import { Brand } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BrandCardProps {
    item: Brand;
    viewMode: "grid" | "list";
}

export function BrandCard({ item, viewMode }: BrandCardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md",
                viewMode === "grid" ? "flex flex-col" : "flex flex-row items-center"
            )}
        >
            <div
                className={cn(
                    "relative",
                    viewMode === "grid" ? "h-48 w-full" : "h-24 w-24 flex-shrink-0"
                )}
            >
                <img
                    src={item.image || "/placeholder-brand.png"}
                    alt={item.name}
                    className="h-full w-full object-contain rounded-t-lg"
                />
            </div>
            <div
                className={cn(
                    "p-4 flex flex-col",
                    viewMode === "grid" ? "flex-grow" : "flex-grow pl-4"
                )}
            >
                <h3 className="text-lg font-semibold truncate">{item.name}</h3>
            </div>
        </div>
    );
}