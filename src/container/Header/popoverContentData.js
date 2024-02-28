import { Box, Grid } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";

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

const PopoverContentData = () => {
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
              fc="#808080"
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
            <Grid
              key={index}
              columnGap={"17px"}
              padding={"9px 8px"}
              display={"flex"}
              alignItems={"center"}
              borderRadius={"8px"}
              backgroundColor={"#EFEFEF"}
              maxWidth={"239px"}
              width={"239px"}
            >
              <img width={"47px"} src={item?.icon} alt="img" />
              <HeaderTypography fc="#0FAE96" fz="1em" fw="500">
                {item?.text}
              </HeaderTypography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopoverContentData;
