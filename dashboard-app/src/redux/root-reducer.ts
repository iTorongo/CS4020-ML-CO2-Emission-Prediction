import { combineReducers } from "@reduxjs/toolkit";

import { homeReducer, HOME_FEATURE_KEY } from "@app/features/home/home";

const rootReducer = combineReducers({
  [HOME_FEATURE_KEY]: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
