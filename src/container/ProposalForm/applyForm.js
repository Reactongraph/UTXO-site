import React, { useState } from "react";
import Header from "../Header";
import {
  FormContainer,
  ImageWrapperFile,
  Imagecross,
  MainWrapper,
  TextAreaWrap,
} from "./Styled";
import { Box, IconButton } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { FormFields } from "./constant";
import Footer from "../Footer";
import { CommonButton } from "../../components/Common/CommonButton";
import { useNavigate } from "react-router-dom";

const ApplyForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
        >
          <FormContainer>
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
    <>
      <Box maxWidth="1472px" margin={"auto"} padding={"20px"}>
        {/* <ImageWrapper src="/images/edit-screen.svg" /> */}
        <Box
          border={"1px solid #ECF1F0"}
          padding={"25px"}
          borderRadius={"27px"}
          boxShadow={"1px 5px 6px 0px #34333329"}
          marginBottom={"51px"}
          maxWidth={"830px"}
        >
          <HeaderTypography fz="1.5em" fw="700" marginBottom={"4px"}>
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
                      item?.text === "Upload Image" ? "#2B2B2B" : "#808080"
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
              bg="#EFEFEF"
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
      </Box>
    </>
  );
};

export default ApplyForm;

