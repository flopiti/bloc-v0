import Product from '@/components/Product';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ProductsPage = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    
    // Sample data for boxes
    const boxes = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        title: `Product ${i + 1}`,
    }));

    const getRowNumber = (index: number) => Math.floor(index / 2);

    return (
            <div className="grid grid-cols-2 gap-4" style={{ gridAutoRows: '200px' }}>
                {boxes.map((box, index) => (
                    <motion.div
                        key={box.id}
                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
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
                    <Product />
                    </motion.div>
                ))}
            </div>
    );
};

export default ProductsPage;