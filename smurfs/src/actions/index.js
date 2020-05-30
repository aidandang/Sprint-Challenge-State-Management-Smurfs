import axios from 'axios';

// API URLs
const apiurl = 'http://localhost:3333/smurfs';

export const FETCH_SMURF_LIST_START = 'FETCH_SMURF_LIST_START';
export const FETCH_SMURF_LIST_SUCCESS = 'FETCH_SMURF_LIST_SUCCESS';
export const FETCH_SMURF_LIST_FAIL = 'FETCH_SMURF_LIST_FAIL';

export const getSmurfs = () => dispatch => {
  dispatch({ type: FETCH_SMURF_LIST_START });
  axios
    .get(apiurl)
    .then(res =>
      dispatch({ type: FETCH_SMURF_LIST_SUCCESS, payload: res.data })
    )
    .catch(err => dispatch({ type: FETCH_SMURF_LIST_FAIL, payload: err }));
};