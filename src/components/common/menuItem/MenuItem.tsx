import * as React from 'react';
import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { HeaderTypography } from '../typography/Typography';

// Define the type for the theme prop
interface Theme {
  mode: 'light' | 'dark';
  primary?: {
    menuItemText?: string;
  };
}

// Define the type for the props of CommonMenuItem
interface CommonMenuItemProps {
  butonContent: React.ReactNode;
  theme: Theme;
}

// Define the styled components with TypeScript
export const CustomMenu = styled(Menu)<{ bgColor?: string }>(() => ({
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

export const CustomMenuItem = styled(MenuItem)<{ bgColor?: string }>(() => ({
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

export default function CommonMenuItem({ butonContent, theme }: CommonMenuItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const themeCheck = theme.mode === 'light' ? '#fff' : 'rgb(48 46 46)';
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {butonContent}
      </Button>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <CustomMenuItem
          onClick={handleClose}
          style={{
            background: themeCheck
          }}
        >
          <HeaderTypography fw="500" fz="1.25em" fc={theme.primary?.menuItemText}>
            <img src={theme.mode === 'light' ? '/images/low.svg' : '/images/low_dark.svg'} alt="icon"></img>
            Low: 14 sats/vB
          </HeaderTypography>
        </CustomMenuItem>
        <CustomMenuItem
          onClick={handleClose}
          style={{
            background: themeCheck
          }}
        >
          <HeaderTypography fw="500" fz="1.25em" fc={theme.primary?.menuItemText}>
            <img src={theme.mode === 'light' ? '/images/standard.svg' : '/images/standard_dark.svg'} alt="icon"></img>
            Standard: 15 sats/vB
          </HeaderTypography>
        </CustomMenuItem>
        <CustomMenuItem
          onClick={handleClose}
          style={{
            background: themeCheck
          }}
        >
          <HeaderTypography fw="500" fz="1.25em" fc={theme.primary?.menuItemText}>
            <img src={theme.mode === 'light' ? '/images/high.svg' : '/images/high_dark.svg'} alt="icon"></img>
            High: 16 sats/vB
          </HeaderTypography>
        </CustomMenuItem>
      </CustomMenu>
    </Box>
  );
}
