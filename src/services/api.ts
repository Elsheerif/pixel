import { signIn } from 'next-auth/react';
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
        return {
            'Content-Type': 'application/json',
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDZiYmFkOWM5Y2Y2MDljNTcwMTY5NCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4OTAzMjQwLCJleHAiOjE3NjY2NzkyNDB9.bDHhxxxa_HBR0mjUVMbOKZyOI51VH5aQRI5Eg-lOftg"
        }
    }

    async addProductToCart(productId: string): Promise<AddToCartResponse> {
        const response = await fetch(this.baseUrl + "api/v1/cart", {
            method: 'post',
            body: JSON.stringify({ productId }),
            headers: this.getHeaders()
        });
        return response.json();
    }

    async getUserCart(): Promise<GetUserCartResponse> {
        const response = await fetch(this.baseUrl + "api/v1/cart", {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async removeProductFromCart(productId: string): Promise<GetUserCartResponse> {
        const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {
            method: 'delete',
            headers: this.getHeaders()
        });
        return response.json();
    }

    async clearCart(): Promise<GetUserCartResponse> {
        const response = await fetch(this.baseUrl + "api/v1/cart", {
            method: 'delete',
            headers: this.getHeaders()
        });
        return response.json();
    }
    async updateProductQuantity(productId: string, count: number): Promise<GetUserCartResponse> {
        const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {
            method: 'put',
            body: JSON.stringify({ count }),
            headers: this.getHeaders()
        });
        return response.json();
    }

    async signIn(email: string, password: string) {
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch(this.baseUrl + 'api/v1/auth/signin', {
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST"
        });

        console.log('Sign in response status:', response.status);
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
        }

        if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (!text) {
                throw new Error('Empty JSON response from server');
            }
            try {
                return JSON.parse(text);
            } catch (error) {
                throw new Error(`Invalid JSON response from server: ${text}`);
            }
        } else {
            throw new Error('Server returned non-JSON response');
        }
    }

    async signUp(name: string, email: string, password: string) {
        const response = await fetch(this.baseUrl + '/api/v1/auth/signup', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, password }),
        })
        return response.json();
    }
};



export const apiServices = new ApiServices();
