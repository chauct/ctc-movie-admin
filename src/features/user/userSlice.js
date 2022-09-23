import produce from "immer";
import { SET_LIST_USER } from "./action";

const initialState = {
  listUser: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_USER: {
      const nextState = produce(state, (draft) => {
        draft.listUser = action.user;
      });
      return nextState;
    }

    default:
      return state;
  }
};
export default reducer;
