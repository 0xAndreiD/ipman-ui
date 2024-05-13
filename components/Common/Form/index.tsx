import Box, { BoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export default forwardRef<HTMLFormElement, BoxProps<"form">>(
  function Form(props, ref) {
    return <Box {...props} ref={ref} component="form" />;
  },
);
