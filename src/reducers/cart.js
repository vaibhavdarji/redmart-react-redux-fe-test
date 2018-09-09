import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import {
  ADD_PRODUCT,
  SET_QUANTITY,
  REMOVE_PRODUCT,
  GET_CART
} from '../constants';

export const cartProductPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  measurement: PropTypes.string.isRequired
});

const cartList = (state = [], action) => {
  let products = [...state];
  switch (action.type) {
    case ADD_PRODUCT:
      let isProductAddedBefore = products.find(
        product => product.id === action.payload.id
      );
      if (!isProductAddedBefore) {
        isProductAddedBefore = Object.assign(action.payload, { quantity: 1 });
        products = [...products, isProductAddedBefore];
      } else {
        isProductAddedBefore.quantity += 1;
      }
      return products;
    case REMOVE_PRODUCT:
      return state.filter(item => item.id !== action.payload.id);
    case SET_QUANTITY:
      let product = products.find(
        item => item.id === action.payload.product.id
      );
      product.quantity = action.payload.quantity;
      return [...products];
    case GET_CART:
      return state;
    default:
      return state;
  }
};

export const getCart = state => state.cartList;

export default combineReducers({
  cartList
});
