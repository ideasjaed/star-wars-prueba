import { GET_SHIPS } from "../types";

const initialState = {
  ships: [],
};

const ships = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHIPS:
      return {
        ...state,
        ships: action.payload,
      };

    default:
      return state;
  }
};

export default ships;
