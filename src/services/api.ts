import { CartResponse } from "@/interfaces/cart";
import { ProductsResponse, SingleProductResponse } from "@/types";

class ApiServices {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://ecommerce.routemisr.com/";
    }

    private getHeaders() {
        return {
            "Content-Type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDZiYmFkOWM5Y2Y2MDljNTcwMTY5NCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4OTAzMjQwLCJleHAiOjE3NjY2NzkyNDB9.bDHhxxxa_HBR0mjUVMbOKZyOI51VH5aQRI5Eg-lOftg"
        };
    }

    async getAllProducts(): Promise<ProductsResponse> {
        try {
            const response = await fetch(this.baseUrl + "api/v1/products");
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getProductDetails(_id: string): Promise<SingleProductResponse> {
        try {
            const response = await fetch(this.baseUrl + "api/v1/products/" + _id);
            if (!response.ok) {
                throw new Error(`Error fetching product ${_id}: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addProductToCart(productId: string): Promise<CartResponse> {
        try {
            const response = await fetch(this.baseUrl + "api/v1/cart", {
                method: "POST",
                body: JSON.stringify({ productId }),
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`Error adding to cart: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const apiServices = new ApiServices();
