import { Box } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { PrimaryButton } from "./styled";

const ContentBox = ({ data }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"32px"}>
      <HeaderTypography fz="44px" fw="600" fc="#121212">
        Build with and for the UXTO community!
      </HeaderTypography>
      <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
        <HeaderTypography fz="24px" fc="#121212">
          {data?.subtitle1}
        </HeaderTypography>
        <HeaderTypography fz="24px" fc="#121212">
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
