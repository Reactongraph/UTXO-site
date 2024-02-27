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

const columnHeaders = [
  "Grand name",
  "Proposal",
  "Fund amount",
  "BTC wallet",
  "Github link",
  "Additional info",
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
    "Check link"
  ),
  createData(
    "Name 1",
    "Proposal text",
    "1.1023 BTC",
    "bc1q...aw4e",
    "Github Link",
    "Check link"
  ),
  createData(
    "Name 1",
    "Proposal text",
    "1.1023 BTC",
    "bc1q...aw4e",
    "Github Link",
    "Check link"
  ),
];

export default function TableComponent({ onRowClick }) {
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
                }}
              >
                {columnHeaders.map((header, colIndex) => (
                  <TableCell
                    key={header}
                    align="left"
                    sx={{
                      borderBottom: "none",
                      position: "relative",
                      color:
                        header === "Proposal" || header === "Additional info"
                          ? "#808080"
                          : header === "Github link"
                          ? "#46A1F5"
                          : "#2B2B2B",
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
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} padding={"20px 0px 22px"} >
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          id="data"
        />
      </Stack>
    </>
  );
}
