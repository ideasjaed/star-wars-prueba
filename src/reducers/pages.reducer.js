import { SET_COUNT_PAGES, SET_PAGE } from "../types";

const initialState = {
  actualPage: 0,
  pageCount: 0,
};

const pages = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        actualPage: action.payload,
      };
    case SET_COUNT_PAGES:
      return {
        ...state,
        pageCount: action.payload,
      };

    default:
      return state;
  }
};

export default pages;
