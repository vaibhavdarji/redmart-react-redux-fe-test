import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
// import { productPropType } from '../reducers/products';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProduct, removeProduct, setQuantity } from '../actions/cart';

class ProductDetail extends Component {
  state = {
    quantity: this.props.product.quantity || 0
  };
  render = () => {
    const {
      product,
      match: { params: { productId } = {}, path } = {}
    } = this.props;
    if (productId) {
      return (
        <div className={`product-info product-${product.id}`}>
          <h4>{product.name}</h4>
          <div className="info">
            <div className="image">
              <img
                src={require(`../assets/${product.image}`)}
                alt={product.image}
              />
            </div>
            <div className="detail">
              <h4>{product.measurement}</h4>
              <h3>${product.price}</h3>
              <p>{product.desc}</p>
              <button
                className="btn btn-danger no-mx"
                onClick={event => this.onAddItem(event)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <li className={`product-detail product-${product.id}`}>
        <Link to={`/product/${product.id}`}>
          <div className="product-detail-container">
            <img
              src={require(`../assets/${product.image}`)}
              className="product-image"
              alt={product.name}
            />
            <h5 className="product-name">{product.name}</h5>
            <h5 className="product-measurement">{product.measurement}</h5>
            <h2 className="product-price">${product.price}</h2>
            {path.includes('cart') ? (
              <Fragment>
                <div className="cart-quantity">
                  <button
                    className="btn btn-small"
                    onClick={event => this.changeQuantity(event)}
                  >
                    -
                  </button>
                  <div className="cart-quantity-input">
                    <input
                      type="number"
                      value={this.state.quantity}
                      onClick={event => event.preventDefault()}
                      onChange={event => this.onChangeQty(event)}
                    />
                  </div>

                  <button
                    className="btn btn-small"
                    onClick={event => this.changeQuantity(event, true)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={event => this.onRemoveItem(event)}
                >
                  Remove From Cart
                </button>
              </Fragment>
            ) : (
              <button
                className="btn btn-danger"
                onClick={event => this.onAddItem(event)}
              >
                Add To Cart
              </button>
            )}
          </div>
        </Link>
      </li>
    );
  };

  onAddItem = event => {
    event.preventDefault();
    const { product, addProduct } = this.props;
    addProduct(product);
  };

  onRemoveItem = event => {
    event.preventDefault();
    const { product, removeProduct } = this.props;
    removeProduct(product);
  };

  changeStateQuantity = (event, quantity) => {
    if (quantity === 0) {
      this.onRemoveItem(event);
      return;
    }
    this.setState({ quantity });
    const { product, setQuantity } = this.props;

    setQuantity(product, quantity);
  };

  changeQuantity = (event, isIncrement) => {
    event.preventDefault();
    let { quantity } = this.state;
    quantity = isIncrement ? quantity + 1 : quantity - 1;
    this.changeStateQuantity(event, quantity);
  };

  onChangeQty = event => {
    event.preventDefault();
    const value = parseInt(event.target.value, 10) || 0;
    this.changeStateQuantity(event, value);
  };
}

ProductDetail.propTypes = {
  product: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string
    })
  }).isRequired
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addProduct,
      removeProduct,
      setQuantity
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductDetail)
);
