import { Item, Product } from "@/types/core";
import { withClickHandler } from "@/utils/ui";
import { useState } from "react";
import useCart from "./useCart";
import { useCartStore } from "@/stores/cartStore";


const useProduct = (product: Product) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addItem, removeItem, editItem } = useCart();
    const { cart } = useCartStore();

    const hasProductTypes = product.productTypes && product.productTypes.length > 0;
    const isInCart = cart ? [...cart.confirmedItems, ...cart.pendingItems].some(cartItem => cartItem.product.id === product.id) : false;

    const quantity = isInCart && cart ? [...cart.confirmedItems, ...cart.pendingItems].find(item => item.product.id === product.id)?.quantity ?? 0 : 0;

    const updateQuantity = withClickHandler((delta: number) => {
        if (delta === 0) {
            removeItem(createCartItem(1));
        } else if (quantity === 0 && delta > 0) {
            addItem(createCartItem(1));
        } else if (delta > 0) {
            editItem(createCartItem(delta));
        }
    });


    const createCartItem = (quantity: number): Item => ({
        product,
        quantity,
        productType: hasProductTypes && product.productTypes ? product.productTypes[currentIndex] : undefined
    });



    // Helper function to update product type
    const updateProductType = (newIndex: number) => {
        if (!hasProductTypes || !product.productTypes) return;
        
        setCurrentIndex(newIndex);
        
        // If item is in cart, update its type
        if (isInCart && cart) {
            const cartItem = [...cart.confirmedItems, ...cart.pendingItems].find(item => item.product.id === product.id);
            if (cartItem) {
                editItem({
                    ...cartItem,
                    productType: product.productTypes[newIndex]
                });
            }
        }
    };

    return { currentIndex, quantity, updateQuantity, updateProductType, hasProductTypes, isInCart };
}

export default useProduct;