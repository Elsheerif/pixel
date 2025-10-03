
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

    getHeaders(token?: string) {
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers.token = token;
        }
        return headers;
    }


    async addProductToCart(productId: string, token: string): Promise<AddToCartResponse> {

        const response = await fetch(this.baseUrl + "api/v1/cart", {

            method: 'post',

            body: JSON.stringify({ productId }),

            headers: this.getHeaders(token)

        });

        return response.json();

    }



    async getUserCart(token: string): Promise<GetUserCartResponse> {

        const response = await fetch(this.baseUrl + "api/v1/cart", {

            headers: this.getHeaders(token)

        });

        return response.json();

    }



    async removeProductFromCart(productId: string, token: string): Promise<GetUserCartResponse> {

        const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {

            method: 'delete',

            headers: this.getHeaders(token)

        });

        return response.json();

    }



    async clearCart(token: string): Promise<GetUserCartResponse> {

        const response = await fetch(this.baseUrl + "api/v1/cart", {

            method: 'delete',

            headers: this.getHeaders(token)

        });

        return response.json();

    }


    async updateProductQuantity(productId: string, count: number, token: string): Promise<GetUserCartResponse> {

        const response = await fetch(this.baseUrl + "api/v1/cart/" + productId, {

            method: 'put',

            body: JSON.stringify({ count }),

            headers: this.getHeaders(token)

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
            } catch {
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
