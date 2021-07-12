import rootSaga from "../sagas";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

/* ------------- Assemble The Reducers ------------- */
export const appReducer = combineReducers({});

export const rootReducer = (state: any, action: any) => {
  // Action logout
  // if (action.type === KeyConstant.LOGOUT_REQUEST) {
  //   state = undefined;
  // }
  return appReducer(state, action);
};

/* ------------- Redux Configuration ------------- */

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// kick off root saga
sagaMiddleware.run(rootSaga);

export default store;
