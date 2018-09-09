import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import { REQUEST_FILTERS, RECEIVE_FILTERS } from '../constants';

export const filterPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
});

const filters = (state = [], action) => {
  switch (action.type) {
    case REQUEST_FILTERS:
      return state;
    case RECEIVE_FILTERS:
      return [...action.payload];
    default:
      return state;
  }
};

const isLoading = (state = 0, action) => {
  switch (action.type) {
    case REQUEST_FILTERS:
      return state + 1;
    case RECEIVE_FILTERS:
      return state - 1;
    default:
      return state;
  }
};

export const loadFilters = state => state.isLoading;
export const getFilters = state => state.filters;

export default combineReducers({
  filters,
  isLoading
});
