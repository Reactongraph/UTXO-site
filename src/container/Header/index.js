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
  console.log("themetheme", theme?.palette?.primary);
  return (
    <>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          padding="20px"
          alignItems={"flex-start"}
        >
          <LeftConatiner>
            <Box>
              <img src="/images/logo.svg" alt="logo"></img>
            </Box>
            {HeaderCard}
          </LeftConatiner>
          <RightContainer>
            <Box>{RightContent}</Box>
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
                content={<PopoverContentData />}
                onClose={() => setViewPopover(false)}
                anchorEl={anchorEl}
              />
            </Box>
          </RightContainer>
        </Box>
      </Box>
    </>
  );
};

export default Header;
