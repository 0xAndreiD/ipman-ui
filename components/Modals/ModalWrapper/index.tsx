import CloseIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { forwardRef, PropsWithChildren } from "react";

import FlexBox from "@/components/Common/FlexBox";
import { useHideModal } from "@/store/hooks/modal";

type Props = PropsWithChildren<{
  title: string;
}>;

export default forwardRef<HTMLInputElement, Props>(function ModalWrapper(
  { title, children },
  ref,
) {
  const hideModal = useHideModal();

  return (
    <FlexBox
      className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col rounded bg-white px-4 max-w-xs moblg:max-w-sm tablet:max-w-md"
      tabIndex={-1}
      ref={ref}
    >
      <FlexBox className="w-full items-center justify-between border-b py-4">
        <Typography className="text-lg font-bold">{title}</Typography>
        <Button
          className="text-gray-400 hover:text-gray-600 p-0"
          onClick={hideModal}
        >
          <CloseIcon />
        </Button>
      </FlexBox>

      {children}
    </FlexBox>
  );
});
