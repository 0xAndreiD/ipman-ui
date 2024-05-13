import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAccessToken } from "@/store/hooks/auth";

export function useGuard(authState: boolean, redirectPath: string) {
  const router = useRouter();

  const isAuthenticated = !!useAccessToken();

  useEffect(
    () => {
      if (isAuthenticated !== authState) {
        router.replace(redirectPath);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated],
  );
}
