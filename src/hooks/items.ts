import { useState } from "react";
import { Item } from "@/types/core";
import { useEffect } from "react";
import { itemService } from "@/services/itemService";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemService.getAllItems();
        setItems(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
}

export default useItems;