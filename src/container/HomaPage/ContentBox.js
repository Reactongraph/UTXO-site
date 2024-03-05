import { Box } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { PrimaryButton } from "./styled";

const ContentBox = ({ data, theme }) => {
  const headerText = data?.header;
  const utxoIndex = headerText.indexOf("UTXO");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"32px"}
      sx={{
        "@media screen and (max-width: 768px)": {
          gap: "20px",
        },
      }}
    >
      <HeaderTypography
        fz="44px"
        fw="600"
        fc={theme?.palette?.primary?.typography}
        sx={{
          "@media screen and (max-width: 1024px)": {
            fontSize: "32px",
          },
          "@media screen and (max-width: 768px)": {
            fontSize: "24px",
          },
        }}
      >
        {headerText.slice(0, utxoIndex)}
        <HeaderTypography style={{ display: "contents" }} fc="#1DD773">
          {headerText.slice(utxoIndex, utxoIndex + 4)}
        </HeaderTypography>
        {headerText.slice(utxoIndex + 4)}
      </HeaderTypography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"24px"}
        sx={{
          "@media screen and (max-width: 768px)": {
            gap: "12px",
          },
        }}
      >
        <HeaderTypography
          fz="24px"
          fc={theme?.palette?.primary?.typography}
          sx={{
            "@media screen and (max-width: 1024px)": {
              fontSize: "16px",
            },
            "@media screen and (max-width: 768px)": {
              fontSize: "14px",
            },
          }}
        >
          {data?.subtitle1}
        </HeaderTypography>
        <HeaderTypography
          fz="24px"
          fc={theme?.palette?.primary?.typography}
          sx={{
            "@media screen and (max-width: 1024px)": {
              fontSize: "16px",
            },
            "@media screen and (max-width: 768px)": {
              fontSize: "14px",
            },
          }}
        >
          {data?.subtitle2}
        </HeaderTypography>
      </Box>
      <PrimaryButton variant="outlined" size="large">
        Learn more
      </PrimaryButton>
    </Box>
  );
};

export default ContentBox;
