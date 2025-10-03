"use client";

import { formatPrice } from "@/helpers/currency";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { CartProduct as CartProductI, innerCartProduct } from "@/interfaces/cart";
import { useState } from "react";


interface CartProductProps {
    item: CartProductI<innerCartProduct>;
    handleRemove: (productId: string, setIsRemovingProduct: (value: boolean) => void) => void;
    handleUpdateQuantity?: (productId: string, count: number) => Promise<void>;
}

export default function CartProduct({ item, handleRemove, handleUpdateQuantity }: CartProductProps) {
    const [isRemovingProduct, setIsRemovingProduct] = useState(false);
    const [ProductCounter, setProductCounter] = useState(item.count)
    const [timeOutid, settimeOutid] = useState<NodeJS.Timeout>()


    async function handleUpdateCount(count: number) {
        if (count >= 1 && count <= item.product.quantity) {
            setProductCounter(count);
            clearTimeout(timeOutid);}
            const id = setTimeout(() => {
                handleUpdateQuantity && handleUpdateQuantity(item.product._id, count);
            }, 250);
            settimeOutid(id);
        
    }


    return (
        <div className="flex gap-4 p-4 border rounded-lg">
            {/* Product Image */}
            <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                    src={item.product.imageCover}
                    alt={`Product image for ${item.product.title}`}
                    fill
                    className="object-cover rounded-md"
                    sizes="80px"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold line-clamp-2">
                    <Link
                        href={`/products/${item.product.id}`}
                        className="hover:text-primary transition-colors"
                    >
                        {item.product.title}
                    </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                    {item.product.brand?.name || "No brand"}
                </p>
                <p className="font-semibold text-primary mt-2">
                    {formatPrice(item.price)}
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-2">
                <Button
                    onClick={() => handleRemove(item.product._id, setIsRemovingProduct)}
                    variant="ghost"
                    size="sm"
                    aria-label={`Remove ${item.product.title} from cart`}
                    disabled={isRemovingProduct}
                >
                    {isRemovingProduct ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Trash2 className="h-4 w-4" />
                    )}
                </Button>

                <div className="flex items-center gap-2">
                    <Button
                        disabled={item.count == 1}
                        variant="outline"
                        size="sm"
                        aria-label={`Decrease quantity of ${item.product.title}`}
                        onClick={() => handleUpdateCount(ProductCounter - 1)}

                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{ProductCounter}</span>
                    <Button
                        disabled={item.count == item.product.quantity}
                        variant="outline"
                        size="sm"
                        aria-label={`Increase quantity of ${item.product.title}`}
                        onClick={() => handleUpdateCount(ProductCounter + 1)}

                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}