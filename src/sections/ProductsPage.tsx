import { motion } from 'framer-motion';
import { useState } from 'react';

const ProductsPage = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    
    // Sample data for boxes
    const boxes = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        title: `Product ${i + 1}`,
    }));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-2 gap-4" style={{ gridAutoRows: '200px' }}>
                {boxes.map((box, index) => (
                    <motion.div
                        key={box.id}
                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                        initial={{ height: "200px" }}
                        animate={{
                            height: expandedIndex === index ? "240px" : "200px",
                            y: expandedIndex !== null && index > expandedIndex ? 40 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        style={{
                            position: 'relative',
                            zIndex: expandedIndex === index ? 1 : 0
                        }}
                    >
                        <h2 className="text-lg font-semibold">{box.title}</h2>
                        <p className="mt-2">Click to expand</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;