export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_ERROR = "SEARCH_ERROR";

export const searchLoading = () => ({
  type: SEARCH_LOADING,
});

export const searchSuccess = (payload) => ({
  type: SEARCH_SUCCESS,
  payload,
});

export const searchError = () => ({
  type: SEARCH_ERROR,
});

export const searchData = (countryName) => (dispatch) => {
  dispatch(searchLoading());
  fetch(
    `https://api.covid19api.com/country/${countryName}/status/confirmed?from=2022-05-20T00:00:00Z&to=2022-06-18T00:00:00Z`
  )
    .then((res) => res.json())
    .then((res) => {
      res.message === "Not Found"
        ? dispatch(searchSuccess([]))
        : dispatch(searchSuccess(res));
    })
    .catch((error) => console.log(error));
};
