import { Box } from "@mui/material";
import React, { useState } from "react";
import { LeftConatiner, RightContainer } from "./Styled";
import { CommonButton } from "../../components/Common/CommonButton";
import CommonPopover from "../../components/Common/CommonPopover";
import PopoverContentData from "./popoverContentData";
import { HeaderCard, RightContent } from "./headerContent";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [viewPopover, setViewPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setViewPopover(!viewPopover);
  };
  // console.log("themetheme", theme?.palette?.primary);
  return (
    <>
      <Box position={"relative"}  zIndex={"1"}>
        <Box
          display="flex"
          justifyContent="space-between"
          padding="20px"
          sx={{"@media screen and (max-width: 366px)":{
            padding:"14px"
          }}}
          position={"relative"}  
          zIndex={"1"}
          alignItems={"flex-start"}
        >
          <LeftConatiner>
            <Box>
              {theme?.palette?.mode === "light" ? (
                <img src="/images/logo.svg" alt="logo"></img>
              ) : (
                <img src="/images/logo-dark.svg" alt="logo" />
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
                content={<PopoverContentData theme={theme?.palette} />}
                onClose={() => setViewPopover(false)}
                anchorEl={anchorEl}
              />
            </Box>
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
