import { 
  FETCH_SMURF_LIST_START,
  FETCH_SMURF_LIST_SUCCESS,
  FETCH_SMURF_LIST_FAIL,
} from "../actions";

const initialSmurfList = {
  characters: [],
  error: '',
  isFetching: false
};

const rootReducer = (state = initialSmurfList, action) => {
  switch (action.type) {
    case FETCH_SMURF_LIST_START:
      return {
        ...state,
        isFetching: true,
        error: ''
      };
    case FETCH_SMURF_LIST_SUCCESS:
      return {
        ...state,
        smurfs: action.payload,
        isFetching: false,
        error: ''
      };
    case FETCH_SMURF_LIST_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;

