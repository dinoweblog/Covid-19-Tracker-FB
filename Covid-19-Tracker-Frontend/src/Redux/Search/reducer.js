import { SEARCH_ERROR, SEARCH_LOADING, SEARCH_SUCCESS } from "./action";

const initialState = {
  loading: false,
  error: false,
  cases: [],
  label: [],
};

export const searchReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_LOADING:
      return { ...store, loading: true };

    case SEARCH_SUCCESS:
      return {
        ...store,
        loading: false,
        error: false,
        cases: [...payload.map((e) => e.Cases)],
        label: [...payload.map((e) => e.Date.slice(0, 10))],
      };

    case SEARCH_ERROR:
      return { ...store, loading: false, error: true };

    default:
      return store;
  }
};
