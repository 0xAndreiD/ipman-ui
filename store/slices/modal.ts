import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { ModalCaseReducers, ModalState, ModalType } from "../types/modal";

const initialState = {
  type: ModalType.None,
};

export const { actions, ...slice } = createSlice<
  ModalState,
  ModalCaseReducers,
  "modal",
  {}
>({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload }) => payload,
    hideModal: () => initialState,
  },
});

export const reducer = persistReducer(
  {
    key: "ipman-modal",
    version: 1,
    storage,
  },
  slice.reducer,
);
