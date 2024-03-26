import * as React from 'react';
import { Box } from '@mui/material';
import Popover from '@mui/material/Popover';

interface CommonPopoverProps {
  content: React.ReactNode;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export default function PopOver({ content, open, onClose, anchorEl }: CommonPopoverProps) {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Box>{content}</Box>
    </Popover>
  );
}
