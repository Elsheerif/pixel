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


}


export const apiServices = new ApiServices();
