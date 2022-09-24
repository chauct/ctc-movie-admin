import produce from "immer";
import { SET_INFO_USER, SET_LIST_USER } from "./action";

const initialState = {
  listUser: [],
  thongTinNguoiDung: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_USER: {
      const nextState = produce(state, (draft) => {
        draft.listUser = action.user;
      });
      return nextState;
    }
    case SET_INFO_USER: {
      const nextState = produce(state, (draft) => {
        draft.thongTinNguoiDung = action.user;
      });
      return nextState;
    }

    default:
      return state;
  }
};
export default reducer;
