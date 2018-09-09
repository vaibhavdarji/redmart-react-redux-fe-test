import React, { Component, Fragment } from 'react';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <div className="redmart-wrapper">
          <Header />
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

App.defaultProps = {
  children: null
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
