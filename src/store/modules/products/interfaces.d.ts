// interfaces
import { Attribute } from 'modules/attributes/interfaces';
import { Brand } from 'modules/brands/interfaces';
import { Category } from 'modules/categories/interfaces';
import { Rating } from 'modules/rating/interfaces';
import { Review } from 'modules/reviews/interfaces';

import {
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  PRODUCTS_ERROR,
} from './types';

export interface Product {
  id: string;
  name: string;
  description: string;
  region: string;
  img: string;
  address: string;
}

export interface GetProductsSuccess {
  products: Product[];
  type: GET_PRODUCTS_SUCCESS;
}

export interface GetProductSuccess {
  product: Product;
  type: GET_PRODUCT_SUCCESS;
}

export interface ProductsError {
  error,
  type: PRODUCTS_ERROR;
}

export interface CreateProductSuccess {
  type: CREATE_PRODUCT_SUCCESS;
  product: Product;
}

export interface EditProductSuccess {
  product: Product;
  type: EDIT_PRODUCT_SUCCESS;
}

export interface DeleteProductSuccess {
  id: string;
  type: DELETE_PRODUCT_SUCCESS;
}
