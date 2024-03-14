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

export const FormContainer = styled.div(
  {},
  ({ theme }) => `
  display: flex;
  align-items: center;
  margin: 12px 0px 20px;
  flex-direction: column;
  width: fit-content;
  border: 1px solid #dbd9d9;
  border-radius: 8px;
  padding: 15px 52px;
  background: ${
    theme?.mode === "light" ? theme?.primary?.light : theme?.accent?.dark1
  };
  border:${
    theme?.mode === "light"
      ? `1px solid ${theme?.accent?.lightGrey}`
      : `1px solid ${theme?.accent?.dark2}`
  };
`
);

export const ImageWrapperFile = styled.img`
  width: 156px;
  object-fit: cover;
  border-radius: 8px;
  position: relative;
  height: 96px;
  object-fit: cover;
`;

export const Imagecross = styled.img`
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
`;

export const TextAreaWrap = styled(TextareaAutosize)(
  {},
  ({ theme }) => `
  border-radius: 8px;
  padding: 19px 16px;
  overflow: hidden;
  width: 100%;
  resize: none;
  font-size: 1em;
  
  border:${
    theme?.mode === "light"
      ? `1px solid ${theme?.accent?.lightGrey}`
      : `1px solid ${theme?.accent?.dark2}`
  };
  color: ${
    theme?.mode === "light" ? theme?.secondary?.main : theme?.accent?.dark3
  };
  background: ${
    theme?.mode === "light" ? theme?.primary?.light : theme?.accent?.dark1
  };
  font-family: Rubik, sans-serif;
  &::placeholder {
    color:  ${theme?.accent?.placeholder};
  }
`
);

export const CalenderWrap = styled.div({}, ({theme}) => `
  .MuiFormControl-root {
    width: 100%;
    background: ${
      theme?.mode === "light" ? theme?.primary?.light : theme?.accent?.dark1
    };
  }
`);

export const TextAreaWrapper = styled(TextareaAutosize)(
  {},
  ({ theme }) => `
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 19px 16px;
  overflow: hidden;
  width: 100%;
  font-size: 1em;
  background: #f4f6f8;
  font-family: Rubik, sans-serif;
  resize: none;
  border:${
    theme?.mode === "light"
      ? `1px solid ${theme?.accent?.lightGrey}`
      : `1px solid #1E1E1E`
  };
  color: ${theme?.mode === "light" ? "#000" : theme?.secondary?.subHeading};
  background: ${theme?.mode === "light" ? "#f4f6f8" : "#161616"};
  &::placeholder {
    color:  ${theme?.accent?.dark3};
  }
`
);

export const Container = styled.div`
  margin-left: 241px;
  margin-right: 241px;
  max-width: 1472px;
  position: relative;
  z-index: 2;
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
  @media screen and (max-width: 756px) {
    display: flex;
    width: fit-content;
    row-gap: 20px;
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  margin-left: 241px;
  margin-right: 241px;
  max-width: 1472px;
  padding: 20px;
  @media screen and (max-width: 1300px) {
    margin: auto;
  }
`;
