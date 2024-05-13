"use client";

import { PropsWithChildren } from "react";

import { useGuard } from "@/hooks";

export default function AuthLayout({ children }: PropsWithChildren) {
  useGuard(false, "/");

  return <>{children}</>;
}
