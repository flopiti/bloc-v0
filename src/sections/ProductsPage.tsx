import ProductBox from '@/components/ProductBox';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductsStore } from '@/stores/itemsStore';
import { Product } from '@/types/core';

const PRODUCT_BOX_HEIGHT = 190;
const PRODUCT_EXPANDED_HEIGHT = 40;
const PRODUCT_EXPANDED_HEIGHT_FOR_TYPES=60

const ProductsPage = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { products } = useProductsStore();
    const getRowNumber = (index: number) => Math.floor(index / 2);

    const clickedProduct = expandedIndex !== null ? products[expandedIndex] : null;
    const clickedProductHasTypes = clickedProduct?.productTypes && clickedProduct.productTypes.length > 0;
    const clickedExpandedHeight = clickedProductHasTypes ? PRODUCT_EXPANDED_HEIGHT_FOR_TYPES : PRODUCT_EXPANDED_HEIGHT;

    return (
        <div className="grid grid-cols-2 gap-4 mb-25" style={{ gridAutoRows: `${PRODUCT_BOX_HEIGHT}px` }}>
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
            </div>
    );
};

export default ProductsPage;