import { Product } from "@/types/core";

interface ProductHeaderProps {
    product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => (
    <div className="h-[40px] px-2">
        <h3 className="text-sm font-medium text-white line-clamp-2">{product.name}</h3>
    </div>
);

export default ProductHeader; 