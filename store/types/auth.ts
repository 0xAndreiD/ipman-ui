import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  accessToken?: string;
};

type AuthCaseReducer<T = void> = CaseReducer<AuthState, PayloadAction<T>>;

export type AuthCaseReducers = {
  login: AuthCaseReducer<AuthState>;
  logout: AuthCaseReducer;
};
