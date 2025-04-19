import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
import { Cart, Item } from "@/types/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useCart = () => {
    const { setCart, setLoading } = useCartStore();
    const queryClient = useQueryClient();

    const { data: cart, isLoading } = useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: cartService.getCart,
    });

    const addItemMutation = useMutation<void, Error, Item, { previousCart?: Cart }>({
        mutationFn: cartService.addItem,
        onMutate: async (newItem: Item) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData<Cart>(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData<Cart>(['cart'], (old) => {
                if (!old) return { 
                    confirmedItems: [],
                    pendingItems: [newItem],
                    confirmed: false
                };
                return {
                    ...old,
                    pendingItems: [...old.pendingItems, newItem],
                    confirmed: false
                };
            });

            return { previousCart };
        },
        onError: (err: Error, newItem: Item, context) => {
            // Revert to the previous value on error
            console.log('Error adding item:', newItem, err);
            if (context?.previousCart) {
                queryClient.setQueryData(['cart'], context.previousCart);
            }
        },
        onSettled: () => {
            // Refetch cart after mutation
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    // Update cart state based on query state
    useEffect(() => {
        if (cart) {
            setCart(cart);
        }
    }, [cart, setCart]);

    // Update loading state based on query state
    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    return { 
        addItem: addItemMutation.mutate
    };
};

export default useCart;
