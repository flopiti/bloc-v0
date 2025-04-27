import ProductBox from '@/components/ProductBox';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductsStore } from '@/stores/itemsStore';
import { Product } from '@/types/core';

const ProductsPage = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { products } = useProductsStore();
    const getRowNumber = (index: number) => Math.floor(index / 2);

    return (
            <div className="grid grid-cols-2 gap-4 mb-25" style={{ gridAutoRows: '200px' }}>
                {products.map((product : Product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white/5 p-4 rounded-lg shadow-md cursor-pointer"
                        initial={{ height: "200px" }}
                        animate={{
                            height: expandedIndex === index ? "240px" : "200px",
                            y: expandedIndex !== null && getRowNumber(index) > getRowNumber(expandedIndex) ? 40 : 0
                        }}
                        exit={{ height: "200px" }}
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
                ))}
            </div>
    );
};

export default ProductsPage;