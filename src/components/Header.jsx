import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getCart } from '../reducers/cart';

const showBackButton = pathname => pathname !== '/';
const showCartButton = pathname => !pathname.includes('cart');

class Header extends Component {
  state = {};
  render = () => {
    return (
      <div className="header">
        {this.props.backButton ? (
          <Link to="/" className="btn">
            Browse
          </Link>
        ) : (
          ''
        )}
        {this.props.cartButton ? (
          <Link to="/cart" className="btn btn-danger">
            Cart ({this.getQuantity()})
          </Link>
        ) : (
          ''
        )}
      </div>
    );
  };

  getQuantity = () => {
    const { cart } = this.props;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  };
}

Header.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  cart: getCart(state.cart),
  backButton: showBackButton(ownProps.location.pathname),
  cartButton: showCartButton(ownProps.location.pathname)
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
