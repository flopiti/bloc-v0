import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
import { Item } from "@/types/core";
import { useEffect } from "react";

const useCart = () => {
    const { setCart, setLoading } = useCartStore();

    const fetchCart = async () => {
        try {
            setLoading(true);
            const cart = await cartService.getCart();
            setCart(cart);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };


    const addItem = async (item: Item) => {
        try {
            await cartService.addItem(item);
            fetchCart();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };


    useEffect(() => {
        fetchCart();
    }, [setCart, setLoading]);

    return {  fetchCart, addItem };
};

export default useCart;
