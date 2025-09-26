import { ProductsResponse, SingleProductResponse } from "@/types";

const baseUrl = "https://ecommerce.routemisr.com";

class ApiServices {
    baseUrl:string="";

    constructor() {
        this.baseUrl = baseUrl;
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(
            "https://ecommerce.routemisr.com/api/v1/products"
        ).then((res)=>res.json());
    }

    async getProductDetails(productId: string | string[]): Promise<SingleProductResponse> {
        const id = Array.isArray(productId) ? productId[0] : productId;
        const response = await fetch(`${this.baseUrl}/api/v1/products/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    getHeader() {
        return {
            'Content-Type': 'application/json',
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhkMzJjOWQyMjIwNGRhNTE1ZDE0ZjJlIiwiaWF0IjoxNzU4Njc0Mjg3fQ.-P2CxL79yL1un5hqlWwl9GHta1yY3A1Nc0R3kVXMHwE"
        }
    }

    async addProductToCart(productId: string) {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: 'POST',
            body: JSON.stringify({ product: productId }),
            headers: this.getHeader()
        })

    }

}


export const apiServices = new ApiServices();
