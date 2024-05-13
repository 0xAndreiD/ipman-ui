"use client";

import { useRedirect } from "@/hooks";

export default function AuthPage() {
  useRedirect("/auth/login");

  return <></>;
}
