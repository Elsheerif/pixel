"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Loader2 } from "lucide-react";
import { renderStars } from "@/helpers/rating";
import { formatPrice } from "@/helpers/currency";
import { apiServices } from "@/services/api";
import toast from 'react-hot-toast'
import React, { useState, useContext } from "react";
import { cartContext } from "@/contexts/cartContext";
import { useSession } from "next-auth/react";



interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}




export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { setcartCount } = useContext(cartContext);
  const { data: session } = useSession();
  const token = (session?.user as any)?.accessToken;

  async function handleAddToCart() {
    setIsAdding(true);
    try {
      const data = await apiServices.addProductToCart(product!._id, token)
      if (data && data.numOfCartItems !== undefined) {
        setcartCount(data.numOfCartItems);
        toast.success("Product Added To Cart");
      } else if (data?.message === 'fail') {
        toast.error("Failed to add product");
      } else {
        toast.success("Product Added To Cart");
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setIsAdding(false);
    }
  }



  if (viewMode === "list") {
    return (
      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
        <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-contain rounded-md"
            sizes="(max-width: 640px) 96px, 128px"
          />
          </Link>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base sm:text-lg line-clamp-2">
              <Link
                href={`/products/${product._id}`}
                className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {product.title}
              </Link>
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
            <div className="flex items-center gap-1">
              {renderStars(product.ratingsAverage)}
              <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                ({product.ratingsQuantity})
              </span>
            </div>

          
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-lg sm:text-2xl font-bold text-primary">
                {formatPrice(product.price).slice(0,9)}
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span>
                  Brand:{" "}
                  <Link
                    href={`/brands/${product.brand._id}`}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {product.brand.name}
                  </Link>
                </span>
                <span>
                  Category:{" "}
                  <Link
                    href={`/categories/${product.category._id}`}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </span>
              </div>
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm px-2 sm:px-3"
              size="sm"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1 sm:mr-2" />
              ) : (
                <ShoppingCart className="h-4 w-4 mr-1 sm:mr-2" />
              )}
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="group flex flex-col justify-between relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
      <Link href={`/products/${product._id}`}>
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        </Link>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Badge for sold items */}
        {100 > 100 && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            Popular
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          {product.brand.name}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/products/${product._id}`}> {product.title}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(product.ratingsAverage)}</div>
          <span className="text-xs text-muted-foreground">{product.ratingsQuantity}</span>
        </div>

        {/* Category */}
        <p className="text-xs text-muted-foreground mb-2">
          <Link
            href={""}
            className="hover:text-primary hover:underline transition-colors"
          >
            {product.category.name}
          </Link>
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground ">
            {product.sold
              ? (() => {
                const soldStr = String(product.sold).replace(/[^0-9]/g, "");
                const isMillion = soldStr.length >= 6;
                const displayNum = Number(soldStr.slice(0, 4));
                return isMillion ? `${displayNum.toLocaleString()}m` : displayNum.toLocaleString();
              })()
              : "N/A"} sold
          </span>
        </div>
        {/* Add to Cart Button */}
        <div>
          <Button className="w-full bg-orange-500 hover:bg-orange-600" size="sm" onClick={handleAddToCart}>
            {isAdding ? <Loader2 className='animate-spin' /> : <ShoppingCart className="h-4 w-4 mr-2 " />}
            Add to Cart
          </Button>
        </div>

      </div>
    </div>


  );
}
