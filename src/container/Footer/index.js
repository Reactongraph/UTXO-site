import { Box } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import {
  HiddenOnMobile,
  ResponsiveHeaderTypography,
  WrapperFirst,
  WrapperSecond,
  WrapperThird,
  WrapperBox,
} from "./Styled";
import { useTheme } from "@mui/material/styles";

const FooterData = ["utxo.site", "src20utxo.com", "src20utxo.app"];
const FooterPreData = ["Docs", "Github", "Gitbook"];
const FooterPreSouce = [{text:"Twitter",light:"social",dark:"social-dark"}, {text:"Telegram",light:"social-2",dark:"social-2-dark"}, {text:"Discord",light:"social-3",dark:"social-3-dark"}];


const Footer = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme?.palette?.primary?.contrastText} position={"relative"} zIndex={"1"} display={"flex"} justifyContent={"center"} width={"100%"}>
      <Box
        maxWidth={"1440px"}
        bgcolor={theme?.palette?.primary?.contrastText} 
        // margin={"auto"}
        display="flex"
        width={"100%"}
        justifyContent="space-between"
        position={"relative"}  
        zIndex={"1"}
        padding="25px 0px"
        margin="0% 10%"
        columnGap={"35px"}
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
              Source
            </HeaderTypography>
            {FooterPreSouce?.map((item) => {
              return (
              <>
              <WrapperBox display={"flex"} columnGap={"10px"}>
              <img src={`/images/${theme?.palette?.mode === "light" ? item?.light : item?.dark}.svg`} alt="icon"></img>
              <WrapperThird className="mobile-footer">{item.text}</WrapperThird>
              </WrapperBox>
              </>
              );
            })}
          </Box>
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
              // display={"flex"}
              // alignContent={"top"}
              // columnGap={"23px"}
              marginBottom={"15px"}
            >
              {/* <WrapperSecond
                src="/images/vector.svg"
                alt="icon"
              ></WrapperSecond> */}
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
      {theme?.palette?.mode === "dark" && window.innerWidth > 756 && (
          <Box
            width={"681.67px"}
            // height={"520.87px"}
            height={"300px"}
            position={"absolute"}
            left="0"
            // bottom="73px"
            bottom={"220px"}
          >
            <img src="/images/shadow-bottom.png" alt="logo" width={"100%"} height={"100%"} />
          </Box>
        )}
    </Box>
  );
};

export default Footer;
