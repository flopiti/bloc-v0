export type Item = {
  productId: number;
  productName: string;
  productImage: string;
  productType?: string;
  quantity: number;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  productTypes?: string[];
}

export type Cart = {
  confirmedItems: Item[];
  pendingItems : Item[];
  confirmed: boolean;
  nextDelivery?: Date 
};