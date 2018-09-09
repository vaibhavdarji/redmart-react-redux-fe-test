import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getCart, cartProductPropType } from '../reducers/cart';
import Products from './Products';

class Cart extends Component {
  state = {};
  render = () => {
    return (
      <div className="container">
        {this.props.cart.length ? (
          <Fragment>
            <Products products={this.props.cart} />
            <div className="cart-summary">
              <h5>Order Summary</h5>
              <h6> Total $ {this.getTotalPrice()}</h6>
            </div>
          </Fragment>
        ) : (
          'Your Cart is Empty'
        )}
      </div>
    );
  };

  getTotalPrice() {
    const { cart } = this.props;
    let total = 0;
    cart.map(
      product => (total += Number(product.price) * Number(product.quantity))
    );
    return (Math.round(total * 100) / 100).toFixed(2);
    //return Math.round(total * 100) / 100;
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartProductPropType).isRequired
};

const mapStateToProps = state => ({
  cart: getCart(state.cart)
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
