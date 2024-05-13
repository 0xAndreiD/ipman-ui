import MuiFormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import clsx from "clsx";
import { forwardRef } from "react";

export default forwardRef<HTMLInputElement, OutlinedInputProps>(
  function FormControl({ className, label, color, ...props }, ref) {
    return (
      <MuiFormControl className={className} color={color}>
        <FormLabel className={color === "error" ? "text-error" : "text-body"}>
          {label}
        </FormLabel>
        <OutlinedInput
          classes={{
            notchedOutline: clsx(color === "error" && "border-error"),
          }}
          inputRef={ref}
          {...props}
        />
      </MuiFormControl>
    );
  },
);
