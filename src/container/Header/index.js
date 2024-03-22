import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftConatiner, RightContainer } from "./Styled";
import { CommonButton } from "../../components/Common/CommonButton";
import CommonPopover from "../../components/Common/CommonPopover";
import PopoverContentData from "./popoverContentData";
import { HeaderCard, RightContent } from "./headerContent";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../../utils/globals/axiosInstance";

const Header = () => {
  const [login, setLogin] = useState(false);
  const [viewPopover, setViewPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setViewPopover(!viewPopover);
  };

  const handleLogout = async () => {
    const response = await axiosInstance({
      url: "/auth/signout",
    });
    if (response?.message) {
      setLogin(false);
      localStorage.clear();
    }
    console.log("response", response);
  };

  useEffect(() => {
    const networkChangedListener = () => console.log("Network changed");

    window.unisat?.on("accountsChanged", handleAccountChange);
    window.unisat?.on("networkChanged", networkChangedListener);

    return () => {
      window.unisat.removeListener("accountsChanged", handleAccountChange);
      window.unisat.removeListener("networkChanged", networkChangedListener);
    };
  }, []);

  const handleAccountChange = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      handleLogout();
      alert("You have changed your account. Logging out...");
    }
  };

  return (
    <>
      <Box position={"relative"} zIndex={"1"}>
        <Box
          display="flex"
          justifyContent="space-between"
          padding="20px"
          sx={{
            "@media screen and (max-width: 366px)": {
              padding: "14px",
            },
            "@media screen and (max-width: 1060px)": {
              alignItems: "flex-start",
            },
          }}
          position={"relative"}
          zIndex={"1"}
          alignItems={"center"}
        >
          <LeftConatiner>
            <Box>
              {theme?.palette?.mode === "light" ? (
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
            <Box></Box>
            <Box id="header-pop">
              <CommonButton
                fz="1.125em"
                pd="14px 31px"
                aria-describedby={viewPopover ? "simple-popover" : undefined}
                onClick={handleClick}
              >
                Connect
              </CommonButton>
              <CommonPopover
                open={viewPopover}
                content={
                  <PopoverContentData
                    theme={theme?.palette}
                    setLogin={setLogin}
                    handleLogout={handleLogout}
                  />
                }
                onClose={() => setViewPopover(false)}
                anchorEl={anchorEl}
              />
            </Box>
            {login && (
              <CommonButton
                fz="1.125em"
                pd="14px 31px"
                aria-describedby={viewPopover ? "simple-popover" : undefined}
                onClick={handleLogout}
              >
                Logout
              </CommonButton>
            )}
          </RightContainer>
        </Box>
        {theme?.palette?.mode === "dark" && window.innerWidth > 756 && (
          <Box
            width={"681.67px"}
            height={"520.87px"}
            position={"absolute"}
            top="125px"
            right="0"
          >
            <img src="/images/shadow-top.png" alt="logo" width={"100%"} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Header;
