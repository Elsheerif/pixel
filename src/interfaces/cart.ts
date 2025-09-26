export interface CartResponse {

    status: string;
    message: string;
    numOfCartItems: number;
    cartId: string;
    data: CartResponseData
}
interface CartResponseData {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    totalCartPrice: number;

}


interface CartProduct {
    count: number;
    _id: string;
    product: string;
    price: number;

}

