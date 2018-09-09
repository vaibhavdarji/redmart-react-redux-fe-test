import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  loadProducts,
  getProducts,
  productPropType
} from '../reducers/products';

import { loadFilters, getFilters, filterPropType } from '../reducers/filters';

import { fetchFilters } from '../actions/filters';
import { fetchProducts } from '../actions/products';

import Loader from './Loader';
import Sidebar from './Sidebar';
import Filter from './Filter';
import Products from './Products';

class Home extends Component {
  state = {
    filterByBrand: [],
    filterByPrice: []
  };
  componentWillMount = () => {
    this.props.fetchProducts();
    this.props.fetchFilters();
  };
  render = () => {
    const { filterLoading, filters } = this.props;
    return (
      <Fragment>
        <Sidebar>
          {filterLoading === 1 ? (
            <Loader />
          ) : (
            filters.map((filter, index) => (
              <Filter
                key={index}
                filter={filter}
                onFilterClick={this.onFilterClick}
              />
            ))
          )}
        </Sidebar>
        <div className="container">{this.loadProductDetail()}</div>
      </Fragment>
    );
  };
  toCamelCase = string => {
    return string.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
      return match.charAt(match.length - 1).toUpperCase();
    });
  };

  onFilterClick = (selected, filterType, filterValue) => {
    const filterBy = `filterBy${this.toCamelCase(filterType)}`;
    const filter = [...this.state[filterBy]];
    const res = [
      ...(selected
        ? [...filter, filterValue]
        : [...filter].filter(val => val !== filterValue))
    ];
    this.setState(
      {
        [filterBy]: res
      },
      () => {
        this.props.fetchProducts(this.state);
      }
    );
  };

  loadProductDetail = () => {
    const { productLoading, products } = this.props;
    if (productLoading === 1 && products.length === 0) {
      return <Loader />;
    }

    if (products.length === 0) {
      return <p>No products found.</p>;
    }
    return <Products products={products} />;
  };
}

Home.propTypes = {
  productLoading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  filterLoading: PropTypes.number.isRequired,
  filters: PropTypes.arrayOf(filterPropType).isRequired
};

const mapStateToProps = state => ({
  productLoading: loadProducts(state.products),
  products: getProducts(state.products),
  filterLoading: loadFilters(state.filters),
  filters: getFilters(state.filters)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts,
      fetchFilters
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
