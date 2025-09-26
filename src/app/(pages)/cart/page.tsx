import { apiServices } from "@/services/api";
import CartProduct from "@/components/products/CartProduct";

export default async function Cart() {
    const response = await apiServices.getUserCart();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                <p className="text-muted-foreground">
                    {response.numOfCartItems} item
                    {response.numOfCartItems !== 1 ? "s" : ""} in your cart
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {response.data.products.map((item) => (
                        <CartProduct key={item._id} item={item} />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-4">
                        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal ({response.numOfCartItems} items)</span>
                                <span>{response.data.totalCartPrice} EGP</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between font-semibold text-lg mb-6">
                            <span>Total</span>
                            <span>{response.data.totalCartPrice} EGP</span>
                        </div>

                        <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
                            Proceed to Checkout
                        </button>

                        <button className="w-full border mt-2 py-2 rounded-lg">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
