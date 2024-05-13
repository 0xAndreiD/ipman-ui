import Box, { BoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export default forwardRef<HTMLElement, BoxProps>(
  function Container(props, ref) {
    return (
      <Box
        {...props}
        ref={ref}
        display="flex"
        width="100%"
        marginX="auto"
        paddingX={{
          xs: 2,
          tablet: 4,
          laptop: 6,
          desktop: 16,
        }}
        maxWidth={({ breakpoints }) => breakpoints.values.desktop}
      />
    );
  },
);
