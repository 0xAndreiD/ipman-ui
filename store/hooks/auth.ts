import { useDispatch, useSelector } from "react-redux";

import { actions } from "../slices/auth";
import { AuthState } from "../types/auth";

import useStoreSelector from "./useStoreSelector";

export function useLogin() {
  const dispatch = useDispatch();
  return (payload: AuthState) => dispatch(actions.login(payload));
}

export function useLogout() {
  const dispatch = useDispatch();
  return () => dispatch(actions.logout());
}

export function useAccessToken() {
  return useStoreSelector(({ auth }) => auth.accessToken);
}
