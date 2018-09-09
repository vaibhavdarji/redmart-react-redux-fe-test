import { combineReducers } from 'redux';
import Products from './products';
// import Product from './product';
// import Cart from './cart';

const rootReducer = combineReducers({
  products: Products
});

export default rootReducer;
