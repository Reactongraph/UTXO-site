import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { CommonButton } from "../../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import {
  Container,
  MainContainer,
  MainWrapper,
  TextAreaWrapper,
} from "./Styled";
import { FormFieldsEdit } from "./constant";
import { ProposalWrapper } from "../Dashboard/Styled";
import CommonSlider from "../../components/Common/CommonSlider";
import { useTheme } from "@mui/material/styles";

const EditForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const themeType = theme?.palette;
  const [selects, setSelects] = useState([true, false, false, false]);
  const titles = [{ text: "Running", color: "#0FAE96" }];
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
        <Box
          columnGap={"30px"}
          display={"flex"}
          rowGap={"30px"}
          flexWrap={"wrap"}
        >
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              padding={"23px 45px"}
              borderRadius={"8px"}
              border={`1px solid ${
                themeType?.mode === "light" ? "#DBD9D9" : "#1E1E1E"
              }`}
              bgcolor={themeType?.mode === "light" ? "#fff" : "#161616"}
              width="fit-content"
            >
              {themeType?.mode === "dark" ? (
                <img src="/images/dark-attachement.svg" alt="svg"></img>
              ) : (
                <img src="/images/attachment.svg" alt="svg"></img>
              )}
            </Box>
          ))}
        </Box>
      );
    } else {
      return (
        <Box
        // maxWidth={"782px"}
        >
          <TextAreaWrapper
            theme={themeType}
            maxRows={6}
            minRows={item && item?.inputLine}
            fullWidth
            value={item?.value}
            placeholder={item?.placeholder}
            id="fullWidth"
          />
        </Box>
      );
    }
  };
  const titleDates = ["6H", "24H", "7D", "All"];
  return (
    <Container>
      <Box>
        <HeaderTypography
          fz="1.938em"
          fw="600"
          marginBottom={"23px"}
          fc={themeType?.primary?.main}
          sx={{
            " @media screen and (max-width: 367px)": {
              fontSize: "24px",
            },
          }}
        >
          Grand Proposals
        </HeaderTypography>
        <Box marginLeft={"-22px"} marginBottom={"53px"} id="edit-slide">
          <CommonSlider InitialShowNumber={1} responsiveArray={[]} />
        </Box>
      </Box>

      <Box>
        <MainContainer
          display="flex"
          justifyContent={"space-between"}
          // width="782px"
          marginBottom={"23px"}
        >
          <MainContainer display="flex" columnGap={"32px"}>
            <HeaderTypography
              fz="1.938em"
              fw="600"
              fc={themeType?.primary?.main}
            >
              Rohit Kumar
            </HeaderTypography>
            <ProposalWrapper>
              {titles?.map((item) => {
                return (
                  <Box
                    color={`${item.color}`}
                    fontSize={"1em"}
                    fontWeight={500}
                  >
                    {item.text}
                  </Box>
                );
              })}
            </ProposalWrapper>
          </MainContainer>
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
                    height: "fit-content",
                    backgroundColor: selects[index]
                      ? "#0FAE96"
                      : themeType?.mode === "light"
                      ? "#ECF1F0"
                      : "#414141",
                  }}
                  onClick={() => handleClick(index)}
                >
                  {item}
                </Box>
              );
            })}
          </Box>
        </MainContainer>
        <MainWrapper>
          {FormFieldsEdit?.map((item, index) => {
            return (
              <>
                <HeaderTypography
                  fz="1em"
                  marginTop={"20px"}
                  fc={`${
                    item?.text === "Attachments"
                      ? theme?.palette?.primary?.main
                      : "#808080"
                  }`}
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

      <Grid
        sx={{
          margin: "49px 0px 39px 308px",
          "@media screen and (max-width: 500px)": {
            margin: "49px 0px 39px 0px",
            display: "flex",
            justifyContent: "end",
          },
        }}
      >
        <CommonButton
          fc="#929292"
          bg={themeType?.mode === "light" ? themeType?.accent?.grey : "#2F2F2F"}
          mr="0"
          fw="600"
          fz="1.25em"
          pd="14px 45px"
          mfz="16"
          onClick={() => navigate("/")}
        >
          Back
        </CommonButton>
      </Grid>
    </Container>
  );
};

export default EditForm;
