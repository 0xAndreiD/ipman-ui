import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import Link from "next/link";
import SVG from "react-inlinesvg";

import Container from "@/components/Common/Container";
import FlexBox from "@/components/Common/FlexBox";
import { useAccessToken } from "@/store/hooks/auth";

export default function Header() {
  const isAuthenticated = !!useAccessToken();

  return (
    <AppBar
      className="mx-auto py-3 flex items-center justify-center bg-gray-900"
      component="header"
      position="relative"
    >
      <Container className="items-center justify-center">
        <FlexBox className="items-center justify-center">
          <Link className="relative flex items-center" href="/">
            <SVG
              className="relative w-10 h-10 me-1"
              src="/assets/logo/logo.svg"
            />
            <Typography
              className={clsx(
                "moblg:block text-white font-extrabold",
                isAuthenticated && "hidden",
              )}
              variant="h5"
            >
              IPMan
            </Typography>
          </Link>
        </FlexBox>

        {isAuthenticated && (
          <FlexBox className="flex-1 items-center justify-end">
            <Link href="/logout">
              <Button variant="contained" color="primary">
                Sign out
              </Button>
            </Link>
          </FlexBox>
        )}
      </Container>
    </AppBar>
  );
}
