"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirect(path: string) {
  const router = useRouter();

  useEffect(
    () => {
      router.push(path);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
