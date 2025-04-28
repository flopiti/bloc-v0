import { AnimatePresence } from "framer-motion";

// Components
import { Product } from "@/types/core";
import QuantityInput from "./QuantityInput";
import LeftRightNavigator from "./LeftRightNavigator";
import ProductBoxSkeleton from "./ProductBoxSkeleton";
import useProduct from "@/hooks/useProduct";
import ProductImage from "./ProductImage";
import ProductTypeDisplay from "./ProductTypeDisplay";
import ProductHeader from "./ProductHeader";

// Types
interface ProductProps {
    isOpen: boolean;
    product: Product;
    isLoading?: boolean;
}

const ProductBox = ({ isOpen, product, isLoading = false }: ProductProps) => {
    const { 
        currentIndex, 
        quantity, 
        updateQuantity, 
        updateProductType, 
        hasProductTypes, 
        isInCart 
    } = useProduct(product);

    if (isLoading) {
        return <ProductBoxSkeleton />;
    }

    return (
        <div className="relative h-full">
            {/* Top section */}
            <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem] relative">
                    <ProductImage 
                        product={product}
                        isOpen={isOpen}
                        hasProductTypes={hasProductTypes ?? false}
                        isInCart={isInCart ?? false}
                        currentIndex={currentIndex}
                    />
                    {isOpen && hasProductTypes && product.productTypes && product.productTypes.length > 1 && (
                        <LeftRightNavigator 
                            currentIndex={currentIndex}
                            updateProductType={updateProductType}
                            length={product.productTypes.length}
                        />
                    )}
                </div>
                <ProductHeader product={product} />
            </div>

            {/* Bottom section */}
            <div className="absolute bottom-0 left-0 right-0">
                <AnimatePresence mode="wait">
                    {isOpen && hasProductTypes && product.productTypes && (
                        <ProductTypeDisplay 
                            product={product}
                            currentIndex={currentIndex}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <QuantityInput
                            quantity={quantity}
                            onUpdateQuantity={updateQuantity}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}   

export default ProductBox;