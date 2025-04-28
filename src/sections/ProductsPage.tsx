import ProductBox from '@/components/ProductBox';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useProductsStore } from '@/stores/itemsStore';
import { Product } from '@/types/core';

const PRODUCT_BOX_HEIGHT = 190;
const PRODUCT_EXPANDED_HEIGHT = 40;
const PRODUCT_EXPANDED_HEIGHT_FOR_TYPES=60

const ProductsPage = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { products } = useProductsStore();
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const getRowNumber = (index: number) => Math.floor(index / 2);

    const clickedProduct = expandedIndex !== null ? products[expandedIndex] : null;
    const clickedProductHasTypes = clickedProduct?.productTypes && clickedProduct.productTypes.length > 0;
    const clickedExpandedHeight = clickedProductHasTypes ? PRODUCT_EXPANDED_HEIGHT_FOR_TYPES : PRODUCT_EXPANDED_HEIGHT;

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = products.map(product => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = product.image;
                    img.onload = () => {
                        // Cache the image in the browser
                        img.style.display = 'none';
                        document.body.appendChild(img);
                        setTimeout(() => {
                            document.body.removeChild(img);
                            resolve(true);
                        }, 0);
                    };
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(imagePromises);
                // Add a small delay to ensure smooth transition
                setTimeout(() => {
                    setImagesLoaded(true);
                }, 300);
            } catch (error) {
                console.error('Error preloading images:', error);
                setImagesLoaded(true);
            }
        };

        preloadImages();
    }, [products]);

    if (!imagesLoaded) {
        return (
            <div className="grid grid-cols-2 gap-4 mb-25" style={{ gridAutoRows: `${PRODUCT_BOX_HEIGHT}px` }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white/5 p-4 rounded-lg shadow-md"
                    >
                        <div className="h-[8rem] relative">
                            <div className="h-full w-full bg-white/10 animate-pulse rounded-lg" />
                        </div>
                        <div className="h-[40px] mt-2">
                            <div className="h-4 bg-white/10 rounded w-3/5 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <motion.div 
            className="grid grid-cols-2 gap-4 mb-25" 
            style={{ gridAutoRows: `${PRODUCT_BOX_HEIGHT}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {products.map((product : Product, index) => {
                const hasProductTypes = product.productTypes && product.productTypes.length > 0;
                const expandedHeight = hasProductTypes ? PRODUCT_EXPANDED_HEIGHT_FOR_TYPES : PRODUCT_EXPANDED_HEIGHT;
                return (
                <motion.div
                    key={product.id}
                        className="bg-white/5 p-4 rounded-lg shadow-md cursor-pointer"
                        initial={{ height: "200px" }}
                        animate={{
                            height: expandedIndex === index ? `${PRODUCT_BOX_HEIGHT + expandedHeight}px` : `${PRODUCT_BOX_HEIGHT}px`,
                            y: expandedIndex !== null && getRowNumber(index) > getRowNumber(expandedIndex) ? clickedExpandedHeight : 0
                        }}
                        exit={{ height: `${PRODUCT_BOX_HEIGHT}px` }}
                        transition={{ 
                            duration: 0.3, 
                            ease: "easeInOut",
                            delay: expandedIndex === null ? 0.3 : 0
                        }}
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        style={{
                            position: 'relative',
                            zIndex: expandedIndex === index ? 1 : 0
                        }}
                    >
                    <ProductBox isAddOpen={expandedIndex === index} product={product}/>
                    </motion.div>
                )
            })}
            </motion.div>
    );
};

export default ProductsPage;