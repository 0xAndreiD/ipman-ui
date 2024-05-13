"use client";

import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/store";

export default function StoreProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
