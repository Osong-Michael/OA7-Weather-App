import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <CircularProgress />
      <Typography component='p' sx={{ marginTop: '40px' }}>Loading Your Weather Data...</Typography>
    </Box>
  );
}