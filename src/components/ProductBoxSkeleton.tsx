
const ProductBoxSkeleton = () => (
    <div className="relative h-full">
        <div className="absolute top-0 left-0 right-0">
                <div className="h-[8rem] relative">
                    <div className="h-full w-full bg-white/10 animate-pulse rounded-lg" />
                </div>
                <div className="h-[40px] mt-2">
                    <div className="h-4 bg-white/10 rounded w-3/5 animate-pulse" />
                </div>
            </div>
        </div>
    );


export default ProductBoxSkeleton; 