import { GET_SHIPS, SET_COUNT_PAGES, SET_PAGE } from "./types";
import axios from "axios";

const BASE_URL = "https://swapi.dev/api/starships/";

export const getShips = (page, callback) => (dispatch) => {
  const url = `${BASE_URL}?page=${page}`;
  axios.get(url).then((res) => {
    dispatch({
      type: GET_SHIPS,
      payload: sortData(res.data.results),
    });

    dispatch({
      type: SET_PAGE,
      payload: page + 1,
    });

    if (page === 1) {
      const lengthPages = Math.round(res.data.count / 10);
      console.log(lengthPages);
      dispatch({
        type: SET_COUNT_PAGES,
        payload: lengthPages,
      });
    }

    callback && callback();
  });
};

export const searchData = (query,filter, page, callback) => (dispatch) => {
  const url = filter === null ? `${BASE_URL}?search=${query}&page=${page}`: `${BASE_URL}?${filter}&search=${query}&page=${page}`;
  axios.get(url).then((res) => {
    dispatch({
      type: GET_SHIPS,
      payload: sortData(res.data.results),
    });
    dispatch({
      type: SET_PAGE,
      payload: page + 1,
    });
    if (page === 1) {
      const lengthPages = Math.round(res.data.count / 10);
      console.log(lengthPages);
      dispatch({
        type: SET_COUNT_PAGES,
        payload: lengthPages,
      });
    }
    callback && callback();
  });
};

const sortData = (data) => {
  return data.sort((a, b) => (a.name > b.name ? 1 : -1));
};
