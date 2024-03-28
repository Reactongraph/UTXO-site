/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { Box, TextareaAutosize } from '@mui/material';

export const MainWrapper = styled(Box)`
  .MuiInputBase-root {
    border-radius: 8px;
  }
`;

export const TextAreaWrapper = styled(TextareaAutosize)(
  {},
  ({ theme }: { theme: any }) => `
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 19px 16px;
  overflow: hidden;
  width: 100%;
  font-size: 1em;
  background: #f4f6f8;
  font-family: Rubik, sans-serif;
  resize: none;
  border:${theme?.mode === 'light' ? `1px solid ${theme?.accent?.lightGrey}` : `1px solid #1E1E1E`};
  color: ${theme?.mode === 'light' ? '#000' : theme?.secondary?.subHeading};
  background: ${theme?.mode === 'light' ? '#f4f6f8' : '#161616'};
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
