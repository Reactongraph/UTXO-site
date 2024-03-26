import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Box>loading...</Box>
    </Box>
  );
};

export default Loader;
