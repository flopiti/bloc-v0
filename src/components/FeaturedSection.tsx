import { motion } from 'framer-motion';
import { FC } from 'react';

interface FeaturedSectionProps {
    imageUrl: string;
    onAddToCart: () => void;
}

const FeaturedSection: FC<FeaturedSectionProps> = ({
    imageUrl,
    onAddToCart
}) => {
    return (
        <motion.div 
            className="relative rounded-xl overflow-hidden"
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
        >
            {/* Animated border */}
            <motion.div
                className="absolute inset-0 border-2 border-secondary rounded-xl pointer-events-none z-10"
                animate={{
                    borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)'],
                    borderWidth: ['2px', '3px', '4px', '3px', '2px']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                }}
            />

            {/* Image container */}
            <div className="relative aspect-[16/9] z-0">
                <img 
                    src={imageUrl} 
                    alt="Featured"
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}

                {/* Centered Add to cart button */}
                <div className="absolute inset-0 flex items-end justify-center">
                    <motion.button
                        onClick={onAddToCart}
                        className="bg-primary text-white px-6 mb-10 py-2 rounded-xl opacity-90 font-medium hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add to cart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedSection; 