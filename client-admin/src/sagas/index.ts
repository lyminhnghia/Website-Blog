/**
 * Saga index: connects action type and saga
 */

import { all } from "redux-saga/effects";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([]);
}
