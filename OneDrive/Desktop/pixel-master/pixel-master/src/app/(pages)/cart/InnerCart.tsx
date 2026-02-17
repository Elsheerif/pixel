"use client";

import { Button } from '@/components';
import CartProduct from '@/components/products/CartProduct';
import { cartContext } from '@/contexts/cartContext';
import { formatPrice } from '@/helpers/currency';
import { GetUserCartResponse } from '@/interfaces/cart';
import { apiServices } from '@/services/api';
import { Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface InnerCartProps {
    cartData: GetUserCartResponse;
}

export default function InnerCart({ cartData }: InnerCartProps) {
    const [innerCartData, setInnerCartData] = useState<GetUserCartResponse>(cartData);
    const [isClearingcart, setisClearingcart] = useState(false);
    const { setcartCount } = useContext(cartContext);
    const { data: session } = useSession();
    const token = (session?.user as any)?.accessToken;

    useEffect(() => {
        setcartCount(innerCartData.numOfCartItems);
    }, [innerCartData, setcartCount]);

    // Handle removing a product from the cart
    async function handleRemove(productId: string, setIsRemovingProduct: (value: boolean) => void) {
        setIsRemovingProduct(true);
        try {
            // Actually call the API to remove from server
            const updatedCart = await apiServices.removeProductFromCart(productId, token);

            toast.success("Product Removed Successfully", {
                position: "bottom-right",
            });

            // Update state with the response from server
            setInnerCartData(updatedCart);
        } catch (error) {
            toast.error("Failed to remove product", { position: "bottom-right" });
        } finally {
            setIsRemovingProduct(false);
        }
    }

    async function handleClearCart() {
        setisClearingcart(true);
        try {
            await apiServices.clearCart(token);
            const newCartData = await apiServices.getUserCart(token);
            setInnerCartData(newCartData);
            toast.success("Cart Cleared successfully", { position: "bottom-right" });
        } catch (error) {
            toast.error("Failed to clear cart", { position: "bottom-right" });
        } finally {
            setisClearingcart(false);
        }
    }

    async function handleUpdateQuantity(productId: string, count: number) {
        try {
            await apiServices.updateProductQuantity(productId, count, token);
            const newCartData = await apiServices.getUserCart(token);
            setInnerCartData(newCartData);
        } catch (error) {
            toast.error("Failed to update quantity", { position: "bottom-right" });
        }
    }

    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                {innerCartData.numOfCartItems > 0 && (
                    <p className="text-muted-foreground">
                        There {innerCartData.numOfCartItems === 1 ? "is" : "are"} {innerCartData.numOfCartItems} item
                        {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
                    </p>
                )}
            </div>

            {innerCartData.numOfCartItems > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {innerCartData.data.products.map((item) => (
                                <div key={item.product._id} className="bg-white rounded-lg">
                                    <CartProduct
                                        handleRemove={handleRemove}
                                        item={item}
                                        handleUpdateQuantity={handleUpdateQuantity}
                                    />
                                </div>
                            ))}
                            
                            {/* Clear Cart */}
                            <div className="mt-6">
                                <Button 
                                    onClick={handleClearCart} 
                                    variant="outline" 
                                    aria-label="Clear entire cart"
                                    disabled={isClearingcart}
                                >
                                    {isClearingcart ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4 mr-2" />
                                    )}
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-6 sticky top-4 bg-white">
                            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>
                                        Subtotal: ({innerCartData.numOfCartItems}) item
                                        {innerCartData.numOfCartItems !== 1 ? "s" : ""}
                                    </span>
                                    <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between font-semibold text-lg mb-6">
                                <span>Total</span>
                                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                            </div>

                            <Button
                                className="w-full bg-orange-500 hover:bg-orange-600"
                                size="lg"
                                disabled={innerCartData.numOfCartItems === 0}
                            >
                                Proceed to Checkout
                            </Button>

                            <Button variant="outline" className="w-full mt-2" asChild>
                                <Link href="/products">Continue Shopping</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-muted-foreground">Your cart is empty.</h1>
                    <Button variant="outline" className="mt-2" asChild>
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            )}
        </>
    );
}
