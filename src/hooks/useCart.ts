import { cartService } from "@/services/cartService";
import { useCartStore } from "@/stores/cartStore";
import { Cart, Item } from "@/types/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useCart = () => {
    const { setCart, setLoading, setDeliveryDate } = useCartStore();
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
                    confirmed: false,
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
            console.error('Error adding item:', newItem, err);
            if (context?.previousCart) {
                queryClient.setQueryData(['cart'], context.previousCart);
            }
        },
        onSettled: () => {
            // Refetch cart after mutation
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
    
    const confirmCartMutation = useMutation({
      mutationFn: () => cartService.confirmCart(),
      onMutate: async () => {

        console.log('cart', cart);
        // Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['cart'] });

        // Snapshot the previous value
        const previousCart = queryClient.getQueryData<Cart>(['cart']);

        console.log('previousCart', previousCart);
        // Optimistically update to the new value
        queryClient.setQueryData<Cart>(['cart'], (old) => {
          if (!old) return { 
            confirmedItems: [],
            pendingItems: [],
            confirmed: true,
            nextDelivery: new Date()
          };
          return {
            ...old,
            confirmedItems: [...old.confirmedItems, ...old.pendingItems],
            pendingItems: [],
            confirmed: true
          };
        });

        return { previousCart };
      },
      onError: (err: Error, _, context) => {
        // Revert to the previous value on error
        console.log('Error confirming cart:', err);
        if (context?.previousCart) {
          queryClient.setQueryData(['cart'], context.previousCart);
        }
      },
      onSettled: () => {
        // Refetch cart after mutation
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
    });

    const setDeliveryDateMutation = useMutation({
        mutationFn: (deliveryDate: Date) => cartService.setDeliveryDate(deliveryDate),
        onMutate: async (deliveryDate: Date) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData<Cart>(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData<Cart>(['cart'], (old) => {
                if (!old) return { 
                    confirmedItems: [],
                    pendingItems: [],
                    confirmed: false,
                    nextDelivery: deliveryDate
                };
                return {
                    ...old,
                    nextDelivery: deliveryDate,
                    confirmed: false // Set to unconfirmed when delivery date changes
                };
            });

            // Update the store
            setDeliveryDate(deliveryDate);

            return { previousCart };
        },
        onError: (err: Error, _, context) => {
            // Revert to the previous value on error
            console.error('Error setting delivery date:', err);
            if (context?.previousCart) {
                queryClient.setQueryData(['cart'], context.previousCart);
            }
        },
        onSettled: () => {
            // Refetch cart after mutation
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    const removeItemMutation = useMutation({
        mutationFn: (item: Item) => cartService.removeItem(item),
        onMutate: async (item: Item) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData<Cart>(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData<Cart>(['cart'], (old) => {
                if (!old) return { 
                    confirmedItems: [],
                    pendingItems: [],
                    confirmed: false,
                };
                return {
                    ...old,
                    pendingItems: old.pendingItems.filter(i => i.productId !== item.productId),
                    confirmedItems: old.confirmedItems.filter(i => i.productId !== item.productId),
                    confirmed: false
                };
            });

            return { previousCart };
        },
        onError: (err: Error, item: Item, context) => {
            // Revert to the previous value on error
            console.error('Error removing item:', item, err);
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
        addItem: addItemMutation.mutate,
        confirmCart: confirmCartMutation.mutate,
        setDeliveryDate: setDeliveryDateMutation.mutate,
        removeItem: removeItemMutation.mutate
    };
};

export default useCart;
