import { motion } from 'framer-motion';
import SubHeader from './SubHeader';
import PulseContainer from './PulseContainer';
import { STRAWBERRIES } from '@/mocks/data/items';
import useProduct from '@/hooks/useProduct';

const Featured = () => {
    const {updateQuantity, quantity} = useProduct(STRAWBERRIES);

    const handleAddToCart = () => {
        updateQuantity(quantity + 1);
    };

    return (
        <div>
            <SubHeader text="Featured" />
            <PulseContainer>

            {/* Image container */}
            <div className="relative aspect-[16/9] ">
                <img 
                    src={'/featured.png'} 
                    alt="Featured"
                    className="w-full h-full object-cover "
                />
                
                {/* Centered Add to cart button */}
                <div className="absolute inset-0 flex items-end justify-center">
                    <motion.button
                        onClick={handleAddToCart}
                        className="btn-primary px-6 mb-10 py-2 rounded-xl opacity-90"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add to cart
                    </motion.button>
                </div>
            </div>
        </PulseContainer>
        </div>
    );
};

export default Featured; 