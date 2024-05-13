import FirstIcon from "@mui/icons-material/FirstPageOutlined";
import LastIcon from "@mui/icons-material/LastPageOutlined";
import PrevIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NextIcon from "@mui/icons-material/NavigateNextOutlined";
import { styled } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

import Form from "../Form";

const NumberInput = styled("input")({
  "&::-webkit-inner-spin-button": { display: "none" },
});

type Props = Omit<BoxProps, "onSubmit"> & {
  pageCount: number;
  pageNum: number;
  onSubmit: (value: number) => void;
};

export default function PaginationBar({
  pageCount,
  pageNum,
  onSubmit,
  ...props
}: Props) {
  const [value, setValue] = useState<number | "">("");

  useEffect(() => setValue(pageNum), [pageNum]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    if (value === "") {
      setValue("");
    } else if (/^[0-9]+$/.test(value) && +value > 0 && +value <= pageCount) {
      setValue(+value);
    }
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (value && value !== pageNum) {
      onSubmit(value);
    }
  };

  const handlePrev = () => {
    const newValue = Math.max(+value - 1, 1);

    setValue(newValue);

    if (pageNum !== newValue) {
      onSubmit(newValue);
    }
  };

  const handleNext = () => {
    const newValue = +value + 1;

    setValue(newValue);

    if (pageNum !== newValue) {
      onSubmit(newValue);
    }
  };

  const handleFirst = () => {
    setValue(1);

    if (pageNum !== 1) {
      onSubmit(1);
    }
  };

  const handleLast = () => {
    setValue(pageCount);

    if (pageNum !== pageCount) {
      onSubmit(pageCount);
    }
  };

  return (
    <Box {...props}>
      <Form className="flex w-fit items-center" onSubmit={handleSubmit}>
        <Button
          className="px-1 me-1"
          color="inherit"
          disabled={value === 1}
          onClick={handleFirst}
        >
          <FirstIcon />
        </Button>
        <Button
          className="px-1 me-1"
          color="inherit"
          disabled={value === 1}
          onClick={handlePrev}
        >
          <PrevIcon />
        </Button>
        <NumberInput
          className="w-20 border rounded hover:border-body focus:outline-0 duration-300 text-base text-center px-1 py-1"
          type="number"
          value={value.toString()}
          onChange={handleChange}
        />
        <Button
          className="px-1 ms-1"
          color="inherit"
          disabled={!pageCount || value === pageCount}
          onClick={handleNext}
        >
          <NextIcon />
        </Button>
        <Button
          className="px-1 ms-1"
          color="inherit"
          disabled={!pageCount || value === pageCount}
          onClick={handleLast}
        >
          <LastIcon />
        </Button>
      </Form>
    </Box>
  );
}
