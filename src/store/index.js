import { createStore, applyMiddleware } from 'redux';
import {
  persistCombineReducers,
  persistReducer,
  persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducer as toastr } from 'react-redux-toastr';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import products from '../reducers/products';
import filters from '../reducers/filters';
import cart from '../reducers/cart';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['toastr', 'products', 'cart', 'filters']
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  products: persistReducer(
    {
      key: 'products',
      storage,
      blacklist: ['isLoadingProducts', 'productList']
    },
    products
  ),
  filters: persistReducer(
    {
      key: 'filters',
      storage,
      blacklist: ['isLoading', 'filters']
    },
    filters
  ),
  cart: persistReducer(
    {
      key: 'cart',
      storage
    },
    cart
  ),
  toastr
});

const history = createHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history))
);

persistStore(store);

export { history };
export default store;
