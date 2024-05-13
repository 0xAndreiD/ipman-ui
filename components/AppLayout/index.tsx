"use client";

import Box from "@mui/material/Box";
import axios from "axios";
import { PropsWithChildren } from "react";

import { useSetupAxios } from "@/hooks";

import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import ModalDialog from "./ModalDialog";
import ToastNotification from "./ToastNotification";

export default function AppLayout({ children }: PropsWithChildren) {
  useSetupAxios(axios);

  return (
    <>
      <AppHeader />
      <Box component="main">{children}</Box>
      <AppFooter />
      <ToastNotification />
      <ModalDialog />
    </>
  );
}
