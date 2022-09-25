import produce from "immer";
import { SET_LAY_THONG_TIN_HT_RAP } from "./action";
const initialState = {
  danhSachHeThongRap: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAY_THONG_TIN_HT_RAP: {
      const nextState = produce(state, (draft) => {
        draft.danhSachHeThongRap = action.payload;
      });
      return nextState;
    }

    default:
      return state;
  }
};
export default reducer;
