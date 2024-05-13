"use client";

import { useEffect, useState } from "react";
import { toast, TypeOptions } from "react-toastify";

import { normalize } from "@/utils/message";

type Props = {
  type: TypeOptions;
  message: string | null;
};

export function useShowMessage({ type, message }: Props) {
  const [msg, setMessage] = useState<string>();

  useEffect(() => {
    if (message) {
      setMessage(normalize(message));
    }
  }, [message]);

  useEffect(
    () => {
      if (msg) {
        toast(msg, { type });
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [msg],
  );
}
