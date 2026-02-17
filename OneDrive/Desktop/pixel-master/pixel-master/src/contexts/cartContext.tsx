"use client"

import { createContext, SetStateAction, Dispatch, ReactNode, useEffect } from "react";
import { useState } from "react";

export const cartContext = createContext<{
    cartCount: number;
    setcartCount: Dispatch<SetStateAction<number>>;
    isLoaded: boolean;
}>({
    cartCount: 0,
    setcartCount: () => { },
    isLoaded: false,
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartCount, setcartCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('cartCount');
        if (stored) {
            setcartCount(parseInt(stored, 10));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded && cartCount !== undefined && cartCount !== null) {
            localStorage.setItem('cartCount', cartCount.toString());
        }
    }, [cartCount, isLoaded]);

    return (
        <cartContext.Provider value={{ cartCount, setcartCount, isLoaded }}>
            {children}
        </cartContext.Provider>
    )
}