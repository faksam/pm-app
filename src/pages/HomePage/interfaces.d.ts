// interfaces
import { FaceMask } from '../../store/modules/faceMask/interfaces';

export interface ProductState {
  [key: string]: any;
}

export interface ProductProps {
  getProducts: () => Promise<any>;
  products: Product[];
  [key: string]: any;

  match: {
    url: string;
  };
  location: {
    pathname: string;
  };
}
