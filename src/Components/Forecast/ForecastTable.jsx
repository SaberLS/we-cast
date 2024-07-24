import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { theme } from "../../Themes/theme";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderRadius: "0",
    backgroundColor: "#282c34",
    color: "white",
    textAlign: "center",
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: {md: 14, xs: 10},
    color: "white",
    textAlign: "center",
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
}));

export default function ForecastTable({ list }) {
  return (
    <TableContainer
      sx={{
        backgroundColor: "#282c34",
        maxWidth: "750px",
        borderRadius: "0",
        boxShadow: "0",
        borderLeft: {md:`2px solid ${theme.palette.primary.light}`, sx: "none"},
      }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Temperature&nbsp;(°C)</StyledTableCell>
            <StyledTableCell>Overcast&nbsp;(%)</StyledTableCell>
            <StyledTableCell>Pressure&nbsp;(hPa)</StyledTableCell>
            <StyledTableCell>Humidity&nbsp;(%)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list
            ? list.map(({ main, dt, dt_txt, clouds }) => {
                return (
                  <TableRow
                    key={dt}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {dt_txt}
                    </StyledTableCell>
                    <StyledTableCell>{Math.round(main.temp)}</StyledTableCell>
                    <StyledTableCell>{clouds.all}</StyledTableCell>
                    <StyledTableCell>{main.pressure}</StyledTableCell>
                    <StyledTableCell>{main.humidity}</StyledTableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
