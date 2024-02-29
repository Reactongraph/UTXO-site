import styled from "@emotion/styled";
import { Box, TextareaAutosize } from "@mui/material";

export const ImageWrapper = styled.img`
  width: 100%;
  margin: 44px 0px 32px;
`;

export const MainWrapper = styled(Box)`
  .MuiInputBase-root {
    border-radius: 8px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0px 20px;
  flex-direction: column;
  width: fit-content;
  border: 1px solid #dbd9d9;
  border-radius: 8px;
  padding: 15px 52px;
`;

export const ImageWrapperFile = styled.img`
  width: 156px;
  object-fit: cover;
  border-radius: 8px;
  position: relative;
  height: 96px;
  object-fit: contain;
`;

export const Imagecross = styled.img`
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
`;

export const TextAreaWrap = styled(TextareaAutosize)`
  border: 1px solid rgb(222, 222, 222);
  border-radius: 8px;
  padding: 19px 16px;
  overflow: hidden;
  width: 100%;
  resize: none;
  font-size: 1em;
  font-family: Rubik, sans-serif;
`;

export const TextAreaWrapper = styled(TextareaAutosize)`
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 19px 16px;
  overflow: hidden;
  width: 100%;
  font-size: 1em;
  background: #f4f6f8;
  font-family: Rubik, sans-serif;
  resize: none;
`;

export const Container = styled.div`
  margin-left: 241px;
  max-width: 1472px;
  padding: 30px 20px 0px;
  overflow: hidden;
  @media screen and (max-width: 1300px) {
    margin: auto;
  }
  @media screen and (max-width: 717px) {
    padding: 7 3px 20px 0px;
  }
`;

export const MainContainer = styled(Box)`
  @media screen and (max-width: 830px) {
    display: flex;
    width: fit-content;
    row-gap: 20px;
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  margin-left: 241px;
  max-width: 1472px;
  padding: 20px;

  @media screen and (max-width: 1300px) {
    margin: auto;
  }
`;
