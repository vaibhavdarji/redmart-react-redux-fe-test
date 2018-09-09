import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/products';
import {
  loadProducts,
  getProducts,
  productPropType
} from '../reducers/products';

import ProductDetail from './ProductDetail';
import Loader from './Loader';
class Product extends Component {
  state = {};
  componentWillMount = () => {
    this.props.fetchProducts({ id: this.props.match.params.productId });
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.productId !== prevProps.match.params.productId
    ) {
      this.props.fetchProducts({ id: this.props.match.params.productId });
    }
  }
  render = () => {
    if (this.props.loading === 1) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    }
    const product = this.props.products.find(
      obj => obj && obj.id === Number(this.props.match.params.productId)
    );
    if (!product) {
      return (
        <div className="container">
          <p>Product does not exist</p>
        </div>
      );
    }
    return (
      <div className="container">
        <ProductDetail product={product} />
      </div>
    );
  };
}

Product.propTypes = {
  loading: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired
};

const mapStateToProps = state => ({
  loading: loadProducts(state.products),
  products: getProducts(state.products)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
