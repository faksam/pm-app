import axios from 'axios';
import urlConfig from '../../../urlConfig';

// interfaces
import {
  Product,
  GetProductSuccess,
  ProductsError,
  GetProductsSuccess,
  EditProductSuccess,
  CreateProductSuccess,
  DeleteProductSuccess
} from './interfaces';

// types
import {
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  PRODUCTS_ERROR,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS,
} from './types';

/**
 * action creator
 *
 * Create products success action creator
 *
 * @param {Product} product
 *
 * @returns {CreateProductSuccess}
 */

export const createProductSuccess = (product: Product): CreateProductSuccess => ({
  product,
  type: CREATE_PRODUCT_SUCCESS,
});

/**
 * action creator
 *
 * Get product success action creator
 *
 * @param {Product[]} product
 *
 * @returns {GetProductsSuccess}
 */
export const getProductsSuccess = (data: Product[]): GetProductsSuccess => ({
  products: data,
  type: GET_PRODUCTS_SUCCESS,
});


export const productError = (error): ProductsError => ({
    type: PRODUCTS_ERROR,
    error
  });
/**
 * action creator
 *
 * Get an product success action creator
 *
 * @param {Product} product
 *
 * @returns {GetProductSuccess}
 */
export const getProductSuccess = (data: Product): GetProductSuccess => ({
  product: data,
  type: GET_PRODUCT_SUCCESS,
});

/**
 * action creator
 *
 * Delete specific product success action creator
 *
 * @param {Product} product
 *
 * @returns {DeleteProductSuccess}
 */
export const deleteProductSuccess = (productId: string): DeleteProductSuccess => ({
  id: productId,
  type: DELETE_PRODUCT_SUCCESS,
});

/**
 * action creator
 *
 * Update product success action creator
 *
 * @param {Product} product
 *
 * @returns {EditProductSuccess}
 */
export const editProductSuccess = (product: Product): EditProductSuccess => ({
  product,
  type: EDIT_PRODUCT_SUCCESS,
});

/**
 * Thunk
 *
 * Create product thunk
 *
 * @param {Object} product
 *
 * @returns {Function}
 */
export const createProduct = (product: Product) => dispatch => {
  console.log('in the createProduct');
  console.log(product);
  axios.post(
  `${urlConfig.apiUrl}/products/`, product, urlConfig.options
)
  .then((response) => {
    dispatch(createProductSuccess(response.data));
  })
  .catch(error =>
    dispatch(productError({
      status: error.response.status,
      data: error.response.data
    }))
  );
}

/**
 * Thunk
 *
 * Delete product thunk
 *
 * @param {string} productId
 *
 * @returns {Function}
 */
export const deleteProduct = productId => dispatch => axios.delete(
  `${urlConfig.apiUrl}/products/${productId}`
)
  .then(() => {
    dispatch(deleteProductSuccess(productId));
  })
  .catch((error) =>
    dispatch(productError({
      status: error.response.status,
      data: error.response.data
    }))
  );

  /**
 * Thunk
 *
 * Delete product thunk
 *
 * @param {string} productId
 *
 * @returns {Function}
 */
export const getProduct = productId => dispatch => axios.get(
  `${urlConfig.apiUrl}/products/${productId}`
)
  .then((response) => {
    console.log(response);
    
    dispatch(getProductSuccess(response.data.data));
  })
  .catch((error) =>
    dispatch(productError({
      status: error.response.status,
      data: error.response.data
    }))
  );

/**
 * Thunk
 *
 * Get products thunk
 *
 * @returns {Function}
 */
export const getProducts = () => dispatch => {
  console.log("in get products");
  
  return axios.get(
  `${urlConfig.apiUrl}/products`
)
  .then(response => {
    console.log(response.data);
    
    return dispatch(getProductsSuccess(response.data.products))
  })
  .catch((error) =>
    dispatch(productError({
      status: error.response.status,
      data: error.response.data
    }))
  );
}

/**
 * Thunk
 *
 * Edit an product thunk
 *
 * @param {string} productId
 * @param {Object} updatedRolePayload
 *
 * @returns {Funciton}
 */
export const editProduct = (product: Product) => dispatch => axios.patch(
  `${urlConfig.apiUrl}/products/${product.id}`, product, urlConfig.options
)
  .then((response) => {
    dispatch(getProductSuccess(response.data.data));
  })
  .catch((error) =>
    dispatch(productError({
      status: error.response.status,
      data: error.response.data
    }))
  );

// Set the initial role state
const productInitialState = {
  data: [],
  meta: {},
  errors: {},
  isLoading: false
};

/**
 * Redux reducer for User Role actions
 *
 * This reducer changes the product state of the application
 *
 * @param {ProductState} state Reducer initial state
 * @param {Action} action
 *
 * @returns {ProductState} new state
 */
const reducer = (state = productInitialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: [action.product, ...state.data],
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        data: state.data.map(product =>
          product.id === action.product.id ? action.product : product),
      };
    case DELETE_PRODUCT_SUCCESS:
      const updatedProductList = state.data.filter(product => product.id !== action.productId);
      return {
        ...state,
        data: updatedProductList,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.products,
        meta: action.meta,
        isLoading: action.isLoading,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
