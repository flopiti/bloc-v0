import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
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

    useEffect(() => {
        fetchCart();
    }, [setCart, setLoading]);

    return {  fetchCart };
};

export default useCart;
