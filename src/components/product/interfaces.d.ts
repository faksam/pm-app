export interface ProductState {
  // clickQuickView: boolean;
  [key: string]: any;
}

export interface ProductProps {
  createProduct: (product: Product) => Promise<any>;
  getProduct: (productId: string) => Promise<any>;
  [key: string]: any;
  product: Product;
}
