import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderRadius: "0",
    backgroundColor: "#282c34",
    color: "white",
    textAlign: "center",
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: { md: 14, xs: 10 },
    color: "white",
    textAlign: "center",
    borderBottom: `2px solid ${theme.palette.primary.light}`,
  },
}));