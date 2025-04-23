import Product from '@/components/Product';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useItemsStore } from '@/stores/itemsStore';

const ProductsPage = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { items } = useItemsStore();
    
    const getRowNumber = (index: number) => Math.floor(index / 2);

    return (
            <div className="grid grid-cols-2 gap-4" style={{ gridAutoRows: '200px' }}>
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="bg-white/5 p-4 rounded-lg shadow-md cursor-pointer"
                        initial={{ height: "200px" }}
                        animate={{
                            height: expandedIndex === index ? "240px" : "200px",
                            y: expandedIndex !== null && getRowNumber(index) > getRowNumber(expandedIndex) ? 40 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        style={{
                            position: 'relative',
                            zIndex: expandedIndex === index ? 1 : 0
                        }}
                    >
                    <Product isAddOpen={expandedIndex === index} item={item}/>
                    </motion.div>
                ))}
            </div>
    );
};

export default ProductsPage;