"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useLogout } from "@/store/hooks/auth";

export default function Logout() {
  const router = useRouter();
  const logout = useLogout();

  useEffect(
    () => {
      logout();
      router.push("/auth/login");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <></>;
}
