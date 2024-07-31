import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

// Component to display location info in app bar
export default function LocationInfo({ name, country, admin }) {
  return (
    <Box
      sx={{
        display: { md: 'flex', xs: 'none' },
        justifyContent: 'flex-end',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <Typography>{name}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: '5px' }} />
      <Typography>{country}</Typography>
      <Divider orientation="vertical" flexItem sx={{ marginX: '5px' }} />
      <Typography>{admin}</Typography>
    </Box>
  );
}
