import { REQUEST_FILTERS, RECEIVE_FILTERS } from '../constants';
import { filters } from '../data/products.json';
export const fetchFilters = () => dispatch => {
  dispatch({
    type: REQUEST_FILTERS
  });

  return setTimeout(
    () =>
      dispatch({
        type: RECEIVE_FILTERS,
        payload: filters
      }),
    2000
  );
};
