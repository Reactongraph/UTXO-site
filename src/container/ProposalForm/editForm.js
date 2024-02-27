import { Box } from "@mui/material";
import React, { useState } from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { CommonButton } from "../../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import { MainWrapper, TextAreaWrap } from "./Styled";
import { FormFieldsEdit } from "./constant";

const EditForm = () => {
  const navigate = useNavigate();
  const [selects, setSelects] = useState([true, false, false, false]);
  const handleClick = (index) => {
    setSelects((prevSelects) => {
      const newSelects = prevSelects.map(() => false);
      newSelects[index] = true;
      return newSelects;
    });
  };
  const content = (item) => {
    if (item?.text === "Attachments") {
      return (
        <Box>
          <img src="/images/attachment.svg" alt="svg"></img>
        </Box>
      );
    } else {
      return (
        <>
          <TextAreaWrap
            maxRows={6}
            minRows={item && item?.inputLine}
            fullWidth
            value={item?.value}
            placeholder={item?.placeholder}
            id="fullWidth"
          />
        </>
      );
    }
  };
  const titleDates = ["6H", "24H", "7D", "All"];
  return (
    <Box maxWidth="1472px" margin={"auto"} padding={"20px"}>
      <HeaderTypography fz="1.938em" fw="600" marginBottom={"23px"}>
        Grand Proposals
      </HeaderTypography>
      <Box>
        <HeaderTypography fz="1.938em" fw="600" marginBottom={"23px"}>
          Rohit Kumar
        </HeaderTypography>
        <Box display="flex" columnGap={"20px"}>
          {titleDates?.map((item, index) => {
            return (
              <Box
                key={index}
                style={{
                  padding: "10px 12px",
                  borderRadius: "6px",
                  color: selects[index] ? "#fff" : "#808080",
                  cursor: "pointer",
                  backgroundColor: selects[index] ? "#0FAE96" : "#ECF1F0",
                }}
                onClick={() => handleClick(index)}
              >
                {item}
              </Box>
            );
          })}
        </Box>
        <MainWrapper width="782px">
          {FormFieldsEdit?.map((item, index) => {
            return (
              <>
                <HeaderTypography
                  fz="1em"
                  marginTop={"20px"}
                  fc={`${item?.text === "Attachments" ? "#2B2B2B" : "#808080"}`}
                  marginBottom={"8px"}
                >
                  {item?.text}
                </HeaderTypography>
                {content(item)}
              </>
            );
          })}
        </MainWrapper>
      </Box>
      <CommonButton
        fc="#929292"
        bg="#EFEFEF"
        fw="600"
        fz="1.25em"
        pd="14px 45px"
        mr="0"
        mfz="16"
        onClick={() => navigate("/")}
      >
        Back
      </CommonButton>
    </Box>
  );
};

export default EditForm;
