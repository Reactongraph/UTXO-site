import React, { useState } from "react";
import {
  FormContainer,
  ImageWrapperFile,
  Imagecross,
  MainWrapper,
  TextAreaWrap,
  Wrapper,
} from "./Styled";
import { Box, IconButton } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { FormFields } from "./constant";
import { CommonButton } from "../../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ApplyForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const theme = useTheme();
  const themeType = theme?.palette;
  const navigate = useNavigate();
  const handleImageChange = async (event, type) => {
    const file = event.target.files[0];

    if (file) {
      let img = await fileToBlob(file);
      if (type === 0) {
        setSelectedImage(img);
      } else {
        setSelectedFile(img);
      }
    }
  };

  const handleRemoveImageChange = (type) => {
    type === "Upload Image" ? setSelectedImage(null) : setSelectedFile(null);
  };
  const fileToBlob = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  const content = (item, index) => {
    if (item?.text === "Upload Image" || item?.text === "Upload File") {
      const isUploadImage = item?.text === "Upload Image";
      const isUploadFile = item?.text === "Upload File";
      console.log("item", index);
      return (
        <Box
          display={"flex"}
          key={index}
          alignItems={"center"}
          columnGap={"32px"}
          sx={{
            "@media screen and (max-width: 450px)": {
              flexDirection: "column",
              alignItems: "start",
            },
          }}
        >
          <FormContainer theme={themeType}>
            <label htmlFor={`upload-photo${index}`}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <img
                  src={`${
                    isUploadImage ? "/images/add.svg" : "/images/attach.svg"
                  }`}
                  alt="img"
                />
              </IconButton>
            </label>
            <Box>
              <input
                type="file"
                id={`upload-photo${index}`}
                name={item?.text}
                accept={isUploadImage ? "image/*" : "*"}
                onChange={(event) => handleImageChange(event, index)}
                style={{ display: "none" }}
              />
              <HeaderTypography fz="1em" fc="#0FAE96" fw="500">
                Add
              </HeaderTypography>
            </Box>
          </FormContainer>
          {isUploadImage && selectedImage && (
            <Box position={"relative"} width={"fit-content"}>
              <ImageWrapperFile src={selectedImage} alt="Uploaded" />
              <Imagecross
                src={"/images/cross.svg"}
                alt="Uploaded"
                onClick={() => handleRemoveImageChange(item?.text)}
              />
            </Box>
          )}
          {isUploadFile && selectedFile && (
            <Box position={"relative"} width={"fit-content"}>
              <ImageWrapperFile src={selectedFile} alt="Uploaded" />
              <Imagecross
                src={"/images/cross.svg"}
                alt="Uploaded"
                onClick={() => handleRemoveImageChange(item?.text)}
              />
            </Box>
          )}
        </Box>
      );
    } else {
      return (
        <>
          <TextAreaWrap
            theme={themeType}
            maxRows={6}
            minRows={item && item?.inputLine}
            fullWidth
            placeholder={item?.placeholder}
            id="fullWidth"
          />
        </>
      );
    }
  };

  return (
    <Box position={"relative"} zIndex={"1"}>
      <Wrapper>
        {/* <ImageWrapper src="/images/edit-screen.svg" /> */}
        <Box
          border={
            themeType?.mode === "light"
              ? `1px solid ${themeType?.primary?.dark}`
              : `1px solid ${themeType?.accent?.dark2}`
          }
          padding={"25px"}
          borderRadius={"27px"}
          boxShadow={"1px 5px 6px 0px #34333329"}
          marginBottom={"60px"}
          maxWidth={"830px"}
          bgcolor={
            themeType?.mode === "dark"
              ? themeType?.accent?.dark4
              : themeType?.primary?.light
          }
        >
          <HeaderTypography
            fz="1.5em"
            fw="700"
            marginBottom={"4px"}
            fc={themeType?.primary?.main}
          >
            Apply Proposals
          </HeaderTypography>

          <MainWrapper>
            {FormFields?.map((item, index) => {
              return (
                <>
                  <HeaderTypography
                    fz="1em"
                    marginTop={"20px"}
                    fc={`${
                      item?.text === "Upload Image"
                        ? themeType?.mode === "light"
                          ? themeType?.primary?.main
                          : "#ECF1F0"
                        : themeType?.mode === "light"
                        ? themeType?.secondary?.main
                        : themeType?.accent?.dark3
                    }`}
                    marginBottom={"8px"}
                  >
                    {item?.text}
                  </HeaderTypography>
                  {content(item, index)}
                </>
              );
            })}
          </MainWrapper>
          <Box justifyContent={"end"} display={"flex"} columnGap={"33px"}>
            <CommonButton
              fc="#929292"
              bg={
                themeType?.mode === "light"
                  ? themeType?.accent?.grey
                  : themeType?.accent?.dark1
              }
              fw="600"
              fz="1.25em"
              pd="14px 45px"
              mr="0"
              onClick={() => navigate("/")}
            >
              Back
            </CommonButton>
            <CommonButton
              bg="#0FAE96"
              fw="600"
              fz="1.25em"
              pd="14px 54px"
              mr="0"
            >
              Save
            </CommonButton>
          </Box>
        </Box>
      </Wrapper>
      {themeType?.mode === "light" && (
        <Box
          position={"absolute"}
          height={"387.74px"}
          top="0"
          zIndex="-1"
          width="100%"
          bgcolor={"red"}
          sx={{
            background:
              "linear-gradient(91.18deg, #F0FCFB 49.99%, rgba(201, 255, 250, 0) 98.59%)",
          }}
        ></Box>
      )}
    </Box>
  );
};

export default ApplyForm;
