import { styled, alpha } from '@mui/material/styles';

// Search component styled with MUI's styled API
export const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    // Make the background color slightly lighter on hover
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));
