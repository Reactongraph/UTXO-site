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
import { useTheme } from "@mui/material/styles";

const FooterData = ["utxo.site", "src20utxo.com", "src20utxo.app"];
const FooterPreData = ["Docs", "Github", "Gitbook"];

const Footer = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme?.palette?.primary?.contrastText}>
      <Box
        maxWidth={"1440px"}
        margin={"auto"}
        display="flex"
        justifyContent="space-between"
        padding="25px 20px"
      >
        <Box>
          <WrapperFirst
            src={
              theme?.palette?.mode === "light"
                ? "/images/footer-logo.svg"
                : "/images/logo-dark.svg"
            }
            alt="icon"
          ></WrapperFirst>

          <Box
            margin="29px 0px 10px"
            height="fit-content"
            display="flex"
            alignItems="center"
            gap="13px"
          >
            <WrapperSecond
              src={
                theme?.palette?.mode === "light"
                  ? "/images/discord.svg"
                  : "/images/discord-dark.svg"
              }
              alt="icon"
            ></WrapperSecond>
            <WrapperSecond
              src={
                theme?.palette?.mode === "light"
                  ? "/images/tweeter.svg"
                  : "/images/tweeter-dark.svg"
              }
              alt="icon"
            ></WrapperSecond>
          </Box>
          <ResponsiveHeaderTypography fz="1em" fc="#fff">
            Credit by: UTXO.site
          </ResponsiveHeaderTypography>
        </Box>
        <HiddenOnMobile display={"flex"}>
          <Box>
            {/* <img src="/images/resouce.svg" alt="icon"></img> */}
            <HeaderTypography
              fz="1.063em"
              fc="#fff"
              fw="600"
              marginBottom={"15px"}
            >
              Resource
            </HeaderTypography>
            {FooterPreData?.map((item) => {
              return <WrapperThird>{item}</WrapperThird>;
            })}
          </Box>
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
        </HiddenOnMobile>
      </Box>
    </Box>
  );
};

export default Footer;
