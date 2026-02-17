import { AddToCartResponse, GetUserCartResponse } from "@/interfaces/cart";
import { ProductsResponse, SingleProductResponse } from "@/types";

class ApiServices {
    baseUrl: string = "";
    constructor() {
        this.baseUrl = 'https://ecommerce.routemisr.com/';
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(
            this.baseUrl + "api/v1/products"
        ).then((res) => res.json());
    }

    async getProductDetails(_id: string): Promise<SingleProductResponse> {
        return await fetch(
            this.baseUrl + "api/v1/products/" + _id
        ).then(res => res.json());
    }

    getHeaders() {
        // Get token from NextAuth session (stored in session via JWT callback)
        // This method is designed for client-side calls using useSession hook
        // For server-side calls, use getServerSession from 'next-auth'

        const headers: any = {
            'Content-Type': 'application/json',
        };

        return headers;
    }

    async addProductToCart(productId: string, token?: string): Promise<AddToCartResponse> {
        const headers = this.getHeaders();
        if (token) {
            headers.token = token;
        }

        const response = await fetch(this.baseUrl + "api/v1/cart", {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers
        });
        return response.json();
    }

    async getUserCart(token?: string): Promise<GetUserCartResponse> {
        const headers = this.getHeaders();
        if (token) {
            headers.token = token;
        }

        const response = await fetch(this.baseUrl + "api/v1/cart", {
            headers
        });
        return response.json();
    }

    async removeProductFromCart(productId: string, token?: string): Promise<GetUserCartResponse> {
        const headers = this.getHeaders();
        if (token) {
            headers.token = token;
        }

        const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {
            method: 'DELETE',
            headers
        });
        return response.json();
    }

    async clearCart(token?: string): Promise<GetUserCartResponse> {
        const headers = this.getHeaders();
        if (token) {
            headers.token = token;
        }

        const response = await fetch(this.baseUrl + "api/v1/cart", {
            method: 'DELETE',
            headers
        });
        return response.json();
    }

    async updateProductQuantity(productId: string, count: number, token?: string): Promise<GetUserCartResponse> {
        const headers = this.getHeaders();
        if (token) {
            headers.token = token;
        }

        const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {
            method: 'PUT',
            body: JSON.stringify({ count }),
            headers
        });

        if (!response.ok) {
            throw new Error(`Failed to update quantity: ${response.status}`);
        }

        return response.json();
    }

    async signIn(email: string, password: string) {
        try {
            const response = await fetch(this.baseUrl + 'api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
            }

            const data = await response.json();
            // Token is now managed by NextAuth's JWT callback
            // No need to store it in localStorage
            return data;
        } catch (error) {
            throw error;
        }
    }

    async signUp(name: string, email: string, password: string, rePassword: string) {
        try {
            const payload = { name, email, password, rePassword };

            const response = await fetch(this.baseUrl + 'api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export const apiServices = new ApiServices();