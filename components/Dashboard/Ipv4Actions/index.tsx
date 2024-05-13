import MoreIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import { useRef, useState } from "react";

import FlexBox from "@/components/Common/FlexBox";
import Ipv4Record from "@/services/api/types/Ipv4Record";
import { useShowIpv4DetailsModal } from "@/store/hooks/modal";

export default function Ipv4Actions({ id }: Ipv4Record) {
  const showIpv4DetailsModal = useShowIpv4DetailsModal();

  const moreIcon = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  const [primaryAction, ...actions] = [
    {
      text: "View details",
      handler: () => showIpv4DetailsModal({ id }),
    },
  ];

  return (
    <FlexBox className="gap-2">
      <Button
        className="rounded-full whitespace-nowrap"
        variant="outlined"
        color="secondary"
        onClick={primaryAction.handler}
      >
        {primaryAction.text}
      </Button>

      {!!actions.length && (
        <ClickAwayListener onClickAway={close}>
          <FlexBox className="relative">
            <Button
              className="rounded-full"
              color="secondary"
              ref={moreIcon}
              onClick={toggle}
            >
              <MoreIcon />
            </Button>

            <Popper
              className="z-10"
              open={open}
              anchorEl={moreIcon?.current}
              placement="bottom-end"
              disablePortal
            >
              <MenuList className="flex flex-col bg-white border rounded-md my-0.5 px-0 py-1">
                {actions.map(({ text, handler }, key) => (
                  <MenuItem
                    className="text-sm px-4 py-2"
                    onClick={handler}
                    key={key}
                  >
                    {text}
                  </MenuItem>
                ))}
              </MenuList>
            </Popper>
          </FlexBox>
        </ClickAwayListener>
      )}
    </FlexBox>
  );
}
