"use client";

import RegisterIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC } from "react";

import Container from "@/components/Common/Container";
import FlexBox from "@/components/Common/FlexBox";
import Ipv4Actions from "@/components/Dashboard/Ipv4Actions";
import { useGuard } from "@/hooks";
import { useIpv4s } from "@/services/api/requests/ipv4";
import Ipv4Record from "@/services/api/types/Ipv4Record";
import { useShowIpv4AddModal } from "@/store/hooks/modal";

type Column = {
  render: FC<Ipv4Record & { no: number }> | keyof Ipv4Record;
  text: string;
};

const columns: Column[] = [
  {
    render: ({ no }) => <>{no}</>,
    text: "#",
  },
  {
    render: "ipv4",
    text: "Email",
  },
  {
    render: "comment",
    text: "Comment",
  },
  {
    render: Ipv4Actions,
    text: "Actions",
  },
];

export default function Dashboard() {
  useGuard(true, "/auth/login");

  const showIpv4AddModal = useShowIpv4AddModal();

  const { data } = useIpv4s();

  return (
    <Container className="flex-col py-8 gap-4">
      <FlexBox className="items-center justify-between px-4 py-2 border-b">
        <Typography className="font-semibold">
          {data?.length || 0} IP Address(es)
        </Typography>

        <Button
          className="rounded-full"
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<RegisterIcon />}
          onClick={showIpv4AddModal}
        >
          Add
        </Button>
      </FlexBox>

      <TableContainer className="px-1 py-2">
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map(({ text }, key) => (
                <TableCell className="font-bold" key={key}>
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.length ? (
              data.map((record, idx) => (
                <TableRow key={record.id}>
                  {columns.map(({ render: Render }, key) => (
                    <TableCell key={key}>
                      {typeof Render === "string" ? (
                        <>{record[Render]}</>
                      ) : (
                        <Render {...record} no={idx + 1} />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center" colSpan={columns.length}>
                  No records
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
