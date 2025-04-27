import { useEffect } from "react";
import { useProductsStore } from "@/stores/itemsStore";
import { productService } from "@/services/productService";

const useProducts = () => {
  const { setInitialProducts, setLoading } = useProductsStore();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await productService.getAllProducts();
          setInitialProducts(response);
        } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
}

export default useProducts;