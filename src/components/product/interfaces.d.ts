export interface ProductState {
  // clickQuickView: boolean;
  [key: string]: any;
}

export interface ProductProps {
  createProduct: (product: Product) => Promise<any>;
  product: Product;
  match: {
    url: string;
  };
  location: {
    pathname: string;
  };
}
