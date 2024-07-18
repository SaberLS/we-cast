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
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    color: "white",
    textAlign: "center",
  },
}));

export default function ForecastTable({ list }) {
  return (
    <TableContainer
      sx={{
        backgroundColor: "#282c34",
        width: "750px",
        borderLeft: `2px solid ${theme.palette.primary.light}`,
      }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{}}>Data</StyledTableCell>
            <StyledTableCell>Temperatura&nbsp;(°C)</StyledTableCell>
            <StyledTableCell>Zachmurzenie&nbsp;(%)</StyledTableCell>
            <StyledTableCell>Ciśnienie&nbsp;(hPa)</StyledTableCell>
            <StyledTableCell>Wilgotonść&nbsp;(%)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list
            ? list.map(({ main, dt, dt_txt, clouds }) => {
                return (
                  <TableRow
                    key={dt}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
