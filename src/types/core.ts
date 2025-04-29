export type Product = {
  id: number;
  name: string;
  image: string;
  productTypes?: string[];
  price: number;
};

export type Item = {
  product: Product;
  quantity: number;
  productType?: string;
};

export type Cart = {
  confirmedItems: Item[];
  pendingItems: Item[];
  confirmed: boolean;
  nextDelivery?: Date;
};