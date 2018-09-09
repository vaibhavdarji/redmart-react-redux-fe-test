import React, { Component } from 'react';
import { productPropType } from '../reducers/products';
import PropTypes from 'prop-types';

import ProductDetail from './ProductDetail';

class Products extends Component {
  state = {};
  render() {
    const { products } = this.props;

    return (
      <ul className="product-list">
        {products.map(product => (
          <ProductDetail product={product} key={product.id} />
        ))}
      </ul>
    );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired
};

export default Products;
