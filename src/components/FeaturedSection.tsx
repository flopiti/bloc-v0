import { motion } from 'framer-motion';
import SubHeader from './SubHeader';

interface FeaturedSectionProps {
    imageUrl: string;
    onAddToCart: () => void;
}

const FeaturedSection = ({ imageUrl, onAddToCart }: FeaturedSectionProps) => (
    <>
        <SubHeader text="Featured" />
        <div className=" overflow-hidden">
            <motion.div
                className="border-[0.2rem] border-secondary rounded-xl overflow-hidden"
                animate={{
                    borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.2)'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Image container */}
                <div className="relative aspect-[16/9] ">
                    <img 
                        src={imageUrl} 
                        alt="Featured"
                        className="w-full h-full object-cover "
                    />
                    
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
        </div>
    </>
);

export default FeaturedSection; 