import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { LoginFormValues, RegisterFormValues } from "../types";
import { LoginResponse } from "../types/LoginResponse";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth`;

export function useRequestLogin() {
  return useMutation({
    async mutationFn(values: LoginFormValues) {
      const { data } = await axios.post<LoginResponse>("login", values, {
        baseURL,
      });
      return { accessToken: data.access_token };
    },
  });
}

export function useRequestRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn(values: RegisterFormValues) {
      return axios.post("register", values, { baseURL });
    },
    onSuccess() {
      router.push("/auth/login");
    },
  });
}
