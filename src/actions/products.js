import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from '../constants';

import { products } from '../data/products.json';

export const fetchProducts = (params = {}) => dispatch => {
  let items = [...products];
  dispatch({
    type: REQUEST_PRODUCTS
  });
  if (params && params.id) {
    items = [items.find(product => product.id.toString() === params.id)];
  }

  if (
    params &&
    ((params.filterByBrand && params.filterByBrand.length) ||
      (params.filterByPrice && params.filterByPrice.length))
  ) {
    items = items.filter(
      product =>
        params.filterByBrand.length
          ? params.filterByBrand.find(
              brand =>
                product.name.toLowerCase().indexOf(brand.toLowerCase()) >= 0
            )
          : product
    );
    items = items.filter(
      product =>
        params.filterByPrice.length
          ? params.filterByPrice.find(price => {
              const [minPrice, maxPrice] = price.split('-');
              return (
                product.price >= parseFloat(minPrice) &&
                product.price <= parseFloat(maxPrice)
              );
            })
          : product
    );
  }
  return setTimeout(
    () =>
      dispatch({
        type: RECEIVE_PRODUCTS,
        payload: items
      }),
    2000
  );
};

/* export const filterProducts = filter => dispatch => {
  const { filterByBrand, filterByPrice } = filter;

  let filteredProducts = products.filter(
    product =>
      filterByBrand.length
        ? filterByBrand.find(
            brand =>
              product.name.toLowerCase().indexOf(brand.toLowerCase()) >= 0
          )
        : product
  );

  filteredProducts = filteredProducts.filter(
    product =>
      filterByPrice.length
        ? filterByPrice.find(price => {
            const [minPrice, maxPrice] = price.split('-');
            return (
              product.price >= parseFloat(minPrice) &&
              product.price <= parseFloat(maxPrice)
            );
          })
        : product
  );
  dispatch({
    type: FILTER_PRODUCTS,
    payload: filteredProducts
  });
}; */
