import { Box } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import {
  HiddenOnMobile,
  ResponsiveHeaderTypography,
  WrapperFirst,
  WrapperSecond,
  WrapperThird,
} from "./Styled";

const FooterData = ["utxo.site", "src20utxo.com", "src20utxo.app"];

const Footer = () => {
  return (
    <Box bgcolor={"#0FAE96"}>
      <Box
        maxWidth={"1440px"}
        margin={"auto"}
        display="flex"
        justifyContent="space-between"
        padding="25px 20px"
      >
        <Box>
          <WrapperFirst src="/images/footer-logo.svg" alt="icon"></WrapperFirst>

          <Box
            margin="29px 0px 10px"
            height="fit-content"
            display="flex"
            alignItems="center"
            gap="13px"
          >
            <WrapperSecond src="/images/tweeter.svg" alt="icon"></WrapperSecond>
            <WrapperSecond src="/images/discord.svg" alt="icon"></WrapperSecond>
          </Box>
          <ResponsiveHeaderTypography fz="1em" fc="#fff">
            Credit by: UTXO.site
          </ResponsiveHeaderTypography>
        </Box>
        <Box display={"flex"} columnGap={"73px"}>
          <HiddenOnMobile>
            <img src="/images/resouce.svg" alt="icon"></img>
          </HiddenOnMobile>
          <Box>
            <Box
              display={"flex"}
              alignContent={"top"}
              columnGap={"23px"}
              marginBottom={"15px"}
            >
              <WrapperSecond
                src="/images/vector.svg"
                alt="icon"
              ></WrapperSecond>
              <HeaderTypography fz="1.0625em" fc="#fff" fw="500">
                Website
              </HeaderTypography>
            </Box>

            {FooterData?.map((item) => {
              return <WrapperThird>{item}</WrapperThird>;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
