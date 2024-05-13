import { PropsWithChildren } from "react";

import QueryClientProvider from "./QueryClientProvider";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <QueryClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}
