import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bookingReducer from "features/movie/movieSlice";
import authReducer from "features/auth/authSlice";
import userReducer from "features/user/userSlice";
const rootReducer = combineReducers({
  movie: bookingReducer,
  auth: authReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
