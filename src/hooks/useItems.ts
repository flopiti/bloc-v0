import { useEffect } from "react";
import { itemService } from "@/services/itemService";
import { useItemsStore } from "@/stores/itemsStore";

const useItems = () => {
  const { setInitialItems, setLoading } = useItemsStore();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemService.getAllItems();
        setInitialItems(response);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
}

export default useItems;