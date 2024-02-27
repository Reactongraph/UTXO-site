import { Box } from "@mui/material";
import React from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { CommonButton } from "../../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const navigate = useNavigate();

  return (
    <Box maxWidth="1472px" margin={"auto"} padding={"20px"}>
      <HeaderTypography fz="1.938em" fw="600" marginBottom={"23px"}>
        Grand Proposals
      </HeaderTypography>
      <Box>
        <HeaderTypography fz="1.938em" fw="600" marginBottom={"23px"}>
          Rohit Kumar
        </HeaderTypography>
      </Box>
      <CommonButton
        fc="#929292"
        bg="#EFEFEF"
        fw="600"
        fz="1.25em"
        pd="14px 45px"
        mr="0"
        onClick={() => navigate("/")}
      >
        Back
      </CommonButton>
    </Box>
  );
};

export default EditForm;
