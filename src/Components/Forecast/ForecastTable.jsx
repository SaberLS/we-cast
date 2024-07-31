import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { theme } from '../../Themes/theme';
import { StyledTableCell } from './StyledTableCell';

export default function ForecastTable({ list }) {
  return (
    <TableContainer
      sx={{
        backgroundColor: theme.palette.background.default,
        width: {
          xs: '95vw',
          sm: '95vw',
          md: '80vw',
          lg: '80vw',
          xl: '80vw',
        },
        borderRadius: '0',
        boxShadow: '0',
        borderLeft: {
          md: `2px solid ${theme.palette.primary.light}`,
          sx: 'none',
        },
        overflowX: 'scroll',
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
            ? list.map(({ main, dt, dt_txt, clouds }) => (
                <TableRow
                  key={dt}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
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
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
