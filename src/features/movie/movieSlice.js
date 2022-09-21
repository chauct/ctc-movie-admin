import produce from "immer";

import { SET_INFO_MOVIES, SET_MOVIES } from "./action";

const initialState = {
  movies: [],
  thongTinPhim: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
      });
      return nextState;
    }
    case SET_INFO_MOVIES: {
      const nextState = produce(state, (draft) => {
        draft.thongTinPhim = action.payload;
      });
      return nextState;
    }

    default:
      return state;
  }
};
export default reducer;
