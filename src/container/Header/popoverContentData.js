import { Box, Grid } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { ConnectStyledItem } from "./Styled";

const popData = [
  {
    text: "Unisat",
    icon: "/images/unisat.svg",
  },
  {
    text: "Leather (hiro)",
    icon: "/images/leather.svg",
  },
  {
    text: "OKX Wallet",
    icon: "/images/okx.svg",
  },
];

const PopoverContentData = ({ theme }) => {
  return (
    <Box>
      <Grid
        backgroundColor={""}
        padding={"37px 24px 20px 32px"}
        width={"561px"}
      >
        <Grid display={"flex"} gap={"24px"} marginBottom={"25px"}>
          <img src={"/images/wallet.svg"} alt="img" />
          <Grid>
            <HeaderTypography
              fz={"1.75em"}
              fw="700"
              fc="#0FAE96"
              sx={{
                "@media screen and (max-width: 626px)": {
                  fontSize: "1.4em",
                },
              }}
            >
              Connect Wallet
            </HeaderTypography>
            <HeaderTypography
              fz={"0.938em"}
              fc={theme?.secondary?.main}
              sx={{
                "@media screen and (max-width: 626px)": {
                  width: "70%",
                },
              }}
            >
              Choose the wallet you want to connect
            </HeaderTypography>
          </Grid>
        </Grid>
        <Grid
          display={"flex"}
          flexWrap={"wrap"}
          columnGap={"27px"}
          rowGap={"27px"}
          sx={{
            "@media screen and (max-width: 626px)": {
              flexWrap: "wrap",
              width: "min-content",
            },
          }}
        >
          {popData?.map((item, index) => (
            <ConnectStyledItem key={index} theme={theme}>
              <img width={"47px"} src={item?.icon} alt="img" />
              <HeaderTypography
                fc={theme?.primary?.popoverText}
                fz="1em"
                fw="500"
              >
                {item?.text}
              </HeaderTypography>
            </ConnectStyledItem>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopoverContentData;
