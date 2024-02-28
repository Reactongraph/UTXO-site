import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const LeftConatiner = styled.div`
  display: flex;
  gap: 42px;
  align-items: flex-start;
  width: 100%;
  @media screen and (max-width: 1217px) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    width: fit-content;
    width: 25%;
    gap: 80px;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media screen and (max-width: 756px) {
    align-items: start;
    height: fit-content;
  }
`;

export const HeadConatiner = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  background: rgba(145, 248, 232, 0.1);
  border-radius: 4px;
  padding: 15px 16px 23px;
  height: 94.24px;
  width: 196px;
`;

export const RightWrapper = styled.div`
  padding: 12px;
  background: #ecf1f0;
  display: flex;
  border-radius: 6px;
  @media screen and (max-width: 756px) {
    width: 36px;
    overflow: hidden;
    border-radius: 50%;
    padding: 9px 12px;
    margin-top: 1px;
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  gap: 23px;
  align-items: center;
  @media screen and (max-width: 756px) {
    gap: 1px;
  }
  @media screen and (max-width: 718px) {
    position: absolute;
    left: 10px;
    top: 90px;
  }
`;

export const LeftMainConatiner = styled.div`
@media screen and (max-width: 626px) {
position:absolute
left:10px
}
`;

export const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 756px) {
    flex-direction: row;
  }
`;

export const BoxWrap = styled(Box)`
  row-gap: 20px;
  @media screen and (max-width: 1217px) {
    width: 70rem;
  }
`;

export const BoxContent = styled(Box)`
@media screen and (max-width: 1217px) {
  width: 288%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 2px;
    height: 4px;
    border-radius:20px;
    background-color: rgb(236, 241, 240); 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 20px;
  }

  `;
