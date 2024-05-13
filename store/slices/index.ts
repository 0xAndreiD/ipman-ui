import { combineReducers } from "redux";

import { reducer as auth } from "./auth";
import { reducer as modal } from "./modal";

export const rootReducer = combineReducers({
  auth,
  modal,
});

export type RootState = ReturnType<typeof rootReducer>;
