import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from '../constants';

export const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  measurement: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired
});

const productList = (state = [], action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state;
    case RECEIVE_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
};

const isLoadingProducts = (state = 0, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state + 1;
    case RECEIVE_PRODUCTS:
      return state - 1;
    default:
      return state;
  }
};

export const loadProducts = state => state.isLoadingProducts;

export const getProducts = state => state.productList;

export default combineReducers({
  productList,
  isLoadingProducts
});
