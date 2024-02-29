import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { HeaderTypography } from './CommonTypography';

export default function CommonMenuItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {butonContent}=props||""
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
    >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       {butonContent}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><HeaderTypography fw="500" fz="1.25em"><img src="/images/low.svg"></img>Low: 14 sats/vB</HeaderTypography></MenuItem>
        <MenuItem onClick={handleClose}><HeaderTypography fw="500" fz="1.25em"><img src="/images/standard.svg"></img>Standard: 15 sats/vB</HeaderTypography></MenuItem>
        <MenuItem onClick={handleClose}><HeaderTypography fw="500" fz="1.25em"><img src="/images/high.svg"></img>High: 16 sats/vB</HeaderTypography></MenuItem>
      </Menu>
    </Box>
  );
}
