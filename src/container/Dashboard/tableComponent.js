import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

const columnHeaders = [
  "Grand name",
  "Proposal",
  "Fund amount",
  "BTC wallet",
  "Github link",
  "Additional info",
  "Twitter / X ",
  "Telegram",
];

function createData(...rowData) {
  const dataObject = {};
  columnHeaders.forEach((header, index) => {
    dataObject[header] = rowData[index];
  });
  return dataObject;
}

const rows = [
  createData(
    "Name 1",
    "Proposal text",
    "1.1023 BTC",
    "bc1q...aw4e",
    "Github Link",
    "Check link",
    "Twitter Link",
    "Telegram Link"
  ),
  createData(
    "Name 1",
    "Proposal text",
    "1.1023 BTC",
    "bc1q...aw4e",
    "Github Link",
    "Check link",
    "Twitter Link",
    "Telegram Link"
  ),
  createData(
    "Name 1",
    "Proposal text",
    "1.1023 BTC",
    "bc1q...aw4e",
    "Github Link",
    "Check link",
    "Twitter Link",
    "Telegram Link"
  ),
];

export default function TableComponent({ onRowClick }) {
  const theme = useTheme();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((header, index) => (
                <TableCell
                  align="left"
                  key={header}
                  sx={{
                    "&:not(:last-child)": {
                      borderBottom: "1px solid #D8D8D8",
                    },
                    fontFamily: "Rubik, sans-serif",
                    backgroundColor: "#0FAE96",
                    fontSize: "1em",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick(row?.id)}
                sx={{
                  cursor: "pointer",
                  fontFamily: "Rubik, sans-serif",
                  bgcolor:
                    rowIndex % 2 === 0
                      ? theme?.palette?.secondary?.trowbg
                      : theme?.palette?.secondary?.trow2bg,
                }}
              >
                {columnHeaders.map((header, colIndex) => {
                  const headerReturn =
                    header === "Github link" ||
                    header === "Twitter / X " ||
                    header === "Telegram";

                  return (
                    <TableCell
                      key={header}
                      align="left"
                      sx={{
                        fontFamily: "Rubik, sans-serif",
                        borderBottom: "none",
                        position: "relative",
                        color:
                          header === "Proposal" || header === "Additional info"
                            ? theme?.palette?.secondary?.subHeading
                            : headerReturn
                            ? theme?.palette?.secondary?.link
                            : header === "BTC wallet"
                            ? theme?.palette?.secondary?.wallet
                            : theme?.palette?.primary?.main,
                        fontSize:
                          header === "Fund amount" ||
                          header === "Grand name" ||
                          header === "BTC wallet"
                            ? "1em"
                            : "0.8125em",
                        "&:not(:last-child)::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          height: "100%",
                          borderRight: "1px solid #D8D8D8",
                          fontFamily: "Rubik, sans-serif",
                        },
                      }}
                    >
                      {row[header]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} padding={"20px 0px 22px"}>
        <Pagination count={10} variant="outlined" shape="rounded" id="data" />
      </Stack>
    </>
  );
}
