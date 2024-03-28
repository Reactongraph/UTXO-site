import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ICurrentUser } from '@/types/user.types';
import { HeaderCard, RightContent } from './HeaderContent';
import { truncateAddress } from '@/utils/helpers/jsHelper';
import { CommonButton } from '@/components/common/button/Button';
import { getUserData, logoutUser } from '@/utils/apiCalls/user.apiCalls';
import { DropDown, DropDownItem, LeftConatiner, RightContainer } from './styled';
import { resetUserStore, updateUserAction, useUserContext } from '@/store/contexts/userContext';
import PopOverContent from './PopOverContent';
import useIsLogged from '@/hooks/useIsLogged';
import PopOver from '@/components/common/popover/PopOver';

const Header = () => {
  const [viewPopover, setViewPopover] = useState(false);
  const [logoutPopover, setLogoutPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const theme = useTheme();
  const { isLogged, checkLoginStatus } = useIsLogged();
  const { user: userDetails, dispatch: userDispatch } = useUserContext();

  useEffect(() => {
    if (isLogged) {
      const fetchUserDetails = async () => {
        const userDetails = await getUserData();
        userDispatch(updateUserAction(userDetails as ICurrentUser));
      };
      fetchUserDetails();
    }
  }, [isLogged, userDispatch]);

  const handlePopoverClick = (setPopover: React.Dispatch<React.SetStateAction<boolean>>) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setPopover((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setViewPopover(false);
    setLogoutPopover(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    userDispatch(resetUserStore());
    checkLoginStatus();
    handleClose();
  };

  const renderButton = () => {
    if (isLogged === false) {
      return (
        <CommonButton
          fz="1.125em"
          pd="14px 31px"
          aria-describedby={viewPopover ? 'simple-popover' : undefined}
          onClick={handlePopoverClick(setViewPopover)}
        >
          Connect
        </CommonButton>
      );
    } else if (isLogged && userDetails?.address) {
      return (
        <CommonButton
          fz="1.125em"
          pd="14px 31px"
          id="demo-positioned-button"
          aria-controls={logoutPopover ? 'simple-popover' : undefined}
          aria-haspopup="true"
          aria-expanded={logoutPopover ? 'true' : undefined}
          onMouseEnter={handlePopoverClick(setLogoutPopover)}
        >
          {truncateAddress(userDetails?.address, 10)}
        </CommonButton>
      );
    } else {
      return (
        <CommonButton fz="1.125em" pd="14px 31px">
          Loading...
        </CommonButton>
      );
    }
  };

  return (
    <Box position="relative" zIndex={1}>
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
        position="relative"
        zIndex={1}
        alignItems="center"
      >
        <LeftConatiner>
          <Box>
            <Link to="/">
              <img src={theme?.palette?.mode === 'light' ? '/images/logo.svg' : '/images/logo-dark-header.svg'} alt="logo"></img>
            </Link>
          </Box>
          <HeaderCard theme={theme?.palette} />
        </LeftConatiner>
        <RightContainer>
          <Box>
            <RightContent theme={theme?.palette} />
          </Box>
          <Box id="header-pop">
            {renderButton()}
            <PopOver
              open={viewPopover}
              content={<PopOverContent theme={theme?.palette} setViewPopover={setViewPopover} checkLoginStatus={checkLoginStatus} />}
              onClose={handleClose}
              anchorEl={anchorEl}
            />
            <DropDown
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={logoutPopover}
              onClose={handleClose}
              sx={{ left: -20, top: -5 }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              className={theme.palette.mode === 'light' ? 'light-mode' : 'dark-mode'}
            >
              <Box onMouseLeave={handleClose}>
                <DropDownItem border={theme.palette.mode === 'light' && '1px solid #fff'}>Orders</DropDownItem>
                <DropDownItem border={theme.palette.mode === 'light' && '1px solid #fff'}>Assets</DropDownItem>
                <DropDownItem className="no-hover" border={theme.palette.mode === 'light' && '1px solid #fff'}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    UTXO <b>{userDetails?.balance}</b>
                  </Box>
                </DropDownItem>
                <DropDownItem className="no-hover" border={theme.palette.mode === 'light' && '1px solid #fff'}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    Voting <b>{userDetails?.votingPower}</b>
                  </Box>
                </DropDownItem>
                <DropDownItem
                  onClick={handleLogout}
                  className="logout-btn no-hover"
                  border={theme.palette.mode === 'light' ? '1px solid #fff' : undefined}
                  bg={theme.palette.mode === 'light' ? '#efefef' : undefined}
                  color={theme.palette.mode === 'light' ? '#fff' : undefined}
                >
                  Logout
                </DropDownItem>
              </Box>
            </DropDown>
          </Box>
        </RightContainer>
      </Box>
      {theme?.palette?.mode === 'dark' && window.innerWidth > 756 && (
        <Box width={'681.67px'} height={'520.87px'} position={'absolute'} top="125px" right="0">
          <img src="/images/shadow-top.png" alt="logo" width={'100%'} />
        </Box>
      )}
    </Box>
  );
};

export default Header;
