import React, { useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface BackdropLoaderProps {
  open: boolean;
}

const styles: React.CSSProperties = {
  zIndex: 99999,
  color: '#fff'
};

const BackdropLoader: React.FC<BackdropLoaderProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <Backdrop style={styles} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoader;
