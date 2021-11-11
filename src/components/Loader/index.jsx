import React from 'react';

// Components from Material UI library
import { CircularProgress, Box, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <CircularProgress />
      <Typography component='p' sx={{ marginTop: '40px' }}>Loading Your Weather Data...</Typography>
    </Box>
  );
};