import { ADD_PRODUCT, REMOVE_PRODUCT, SET_QUANTITY } from '../constants';

export const addProduct = product => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: product
  });
};

export const removeProduct = product => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: product
  });
};

export const setQuantity = (product, quantity) => ({
  type: SET_QUANTITY,
  payload: {
    product,
    quantity
  }
});
