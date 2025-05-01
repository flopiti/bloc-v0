import ProductBox from '@/components/ProductBox';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useProductsStore } from '@/stores/productStore';
import { Product } from '@/types/core';
import { useImages } from '@/hooks/useImages';
import SearchBar from '@/components/SearchBar';

const PRODUCT_BOX_HEIGHT = 190;
const PRODUCT_EXPANDED_HEIGHT = 40;
const PRODUCT_EXPANDED_HEIGHT_FOR_TYPES=60

/**
 * ProductsPage Component
 * 
 * A dynamic grid layout component that displays products in a 2-column grid with expandable items.
 * 
 * Key Features:
 * - Responsive grid layout with automatic row sizing
 * - Expandable product boxes with smooth animations using Framer Motion
 * - Dynamic height adjustments based on product type content
 * - Row shifting animation when a product is expanded
 * 
 * Technical Details:
 * - Uses a 2-column grid with fixed height product boxes (190px)
 * - Implements an expandable state system with a single expanded item at a time
 * - Handles two types of expansion heights:
 *   - Standard expansion (40px) for regular products
 *   - Extended expansion (60px) for products with multiple types
 * - Calculates row positions to shift items below the expanded product
 * - Manages image loading states through a custom hook
 * - Implements z-index management for proper layering of expanded items
 * 
 * Animation Behavior:
 * - Smooth height transitions (0.3s duration)
 * - Delayed collapse animation (0.3s delay)
 * - Immediate expansion animation
 * - Row shifting animation for items below the expanded product
 */

const ProductsPage = () => {
    const { products } = useProductsStore();
    const { imagesLoaded } = useImages(products.map(product => product.image));
    const [searchQuery, setSearchQuery] = useState('');

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);    
    const getRowNumber = (index: number) => Math.floor(index / 2);
    const clickedProduct = expandedIndex !== null ? products[expandedIndex] : null;
    const clickedProductHasTypes = clickedProduct?.productTypes && clickedProduct.productTypes.length > 0;
    const clickedExpandedHeight = clickedProductHasTypes ? PRODUCT_EXPANDED_HEIGHT_FOR_TYPES : PRODUCT_EXPANDED_HEIGHT;

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return products;
        return products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.productTypes?.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [products, searchQuery]);

    return (
        <div className="space-y-6">
            <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
            />
            <motion.div 
                className="grid grid-cols-2 gap-4 mb-25" 
                style={{ gridAutoRows: `${PRODUCT_BOX_HEIGHT}px` }}
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <AnimatePresence mode="sync">
                    {filteredProducts.map((product : Product, index) => {
                        const hasProductTypes = product.productTypes && product.productTypes.length > 0;
                        const expandedHeight = hasProductTypes ? PRODUCT_EXPANDED_HEIGHT_FOR_TYPES : PRODUCT_EXPANDED_HEIGHT;
                        return (
                            <motion.div
                                key={product.id}
                                className="bg-white/5 p-4 rounded-lg shadow-md cursor-pointer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    height: expandedIndex === index ? `${PRODUCT_BOX_HEIGHT + expandedHeight}px` : `${PRODUCT_BOX_HEIGHT}px`,
                                    y: expandedIndex !== null && getRowNumber(index) > getRowNumber(expandedIndex) ? clickedExpandedHeight : 0
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.95,
                                    transition: { duration: 0.2 }
                                }}
                                transition={{ 
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                                layout
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            >
                                <ProductBox 
                                    isOpen={expandedIndex === index} 
                                    product={product}
                                    isLoading={!imagesLoaded}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ProductsPage;