

export type Item = {
  id: number;
  name: string;
  image: string;
};

export type Cart = {
  confirmedItems: Item[];
  pendingItems: Item[];
  confirmed: boolean;
};