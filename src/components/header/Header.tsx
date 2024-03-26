import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Menu, MenuItem } from '@mui/material';
import { LeftConatiner, RightContainer } from './styled';
import { HeaderCard, RightContent } from './HeaderContent';
import { CommonButton } from '@/components/common/button/Button';
import useIsLogged from '@/hooks/useIsLogged';
import PopOverContent from './PopOverContent';
import PopOver from '@/components/common/popover/PopOver';
import axiosInstance from '@/utils/helpers/axiosInstance';
import { truncateAddress } from '@/utils/helpers/jsHelper';

const Header = () => {
  const [viewPopover, setViewPopover] = useState(false);
  const [logoutPopover, setLogoutPopover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [userAddress, setUserAddress] = useState<string>('');

  const { isLogged, checkLoginStatus } = useIsLogged();
  const theme = useTheme();

  const handlePopoverClick = (setPopover: React.Dispatch<React.SetStateAction<boolean>>) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setPopover((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setViewPopover(false);
    setLogoutPopover(false);
  };

  const getUserAddress = async () => {
    try {
      const response: { user: { address: string } } = await axiosInstance({
        url: '/auth/me'
      });
      return response.user?.address;
    } catch (error) {
      console.error('Error fetching user address:', error);
      return undefined;
    }
  };

  useEffect(() => {
    if (isLogged) {
      const fetchUserAddress = async () => {
        const address = await getUserAddress();
        setUserAddress(address as unknown as string);
      };

      fetchUserAddress();
    }
  }, [isLogged]);

  const handleLogout = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axiosInstance({
        url: '/auth/signout'
      });

      if (response?.message) {
        localStorage.clear();
        checkLoginStatus();
      }
    } catch (error) {
      localStorage.clear();
      checkLoginStatus();
      console.error('Error during logout:', error);
    }
    handleClose();
  };

  return (
    <>
      <Box position={'relative'} zIndex={'1'}>
        <Box
          display="flex"
          justifyContent="space-between"
          padding="20px"
          sx={{
            '@media screen and (max-width: 366px)': {
              padding: '14px'
            },
            '@media screen and (max-width: 1060px)': {
              alignItems: 'flex-start'
            }
          }}
          position={'relative'}
          zIndex={'1'}
          alignItems={'center'}
        >
          <LeftConatiner>
            <Box>
              {theme?.palette?.mode === 'light' ? (
                <img src="/images/logo.svg" alt="logo"></img>
              ) : (
                <img src="/images/logo-dark-header.svg" alt="logo" />
              )}
            </Box>
            <HeaderCard theme={theme?.palette} />
          </LeftConatiner>
          <RightContainer>
            <Box>
              <RightContent theme={theme?.palette} />
            </Box>
            {!isLogged && (
              <Box id="header-pop">
                <CommonButton
                  fz="1.125em"
                  pd="14px 31px"
                  aria-describedby={viewPopover ? 'simple-popover' : undefined}
                  onClick={handlePopoverClick(setViewPopover)}
                >
                  Connect
                </CommonButton>
                <PopOver
                  open={viewPopover}
                  content={<PopOverContent theme={theme?.palette} setViewPopover={setViewPopover} checkLoginStatus={checkLoginStatus} />}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                />
              </Box>
            )}
            {isLogged && (
              <>
                <CommonButton
                  fz="1.125em"
                  pd="14px 31px"
                  id="demo-positioned-button"
                  aria-controls={logoutPopover ? 'simple-popover' : undefined}
                  aria-haspopup="true"
                  aria-expanded={logoutPopover ? 'true' : undefined}
                  onClick={handlePopoverClick(setLogoutPopover)}
                >
                  {userAddress ? truncateAddress(userAddress, 10) : 'Account'}
                </CommonButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  open={logoutPopover}
                  onClose={handleClose}
                  sx={{ left: -20, top: -10 }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </RightContainer>
        </Box>
        {theme?.palette?.mode === 'dark' && window.innerWidth > 756 && (
          <Box width={'681.67px'} height={'520.87px'} position={'absolute'} top="125px" right="0">
            <img src="/images/shadow-top.png" alt="logo" width={'100%'} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Header;
