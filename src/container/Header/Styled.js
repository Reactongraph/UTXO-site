import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

export const LeftConatiner = styled.div`
  display: flex;
  gap: 42px;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    width: fit-content;
    width: 25%;
    gap: 65px;
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

export const HeadConatiner = styled.div(
  {},
  ({ theme }) => `
  display: flex;
  gap: 20px;
  flex-direction: column;
  background: ${
    theme?.mode === "light" ? "rgba(145, 248, 232, 0.1)" : theme?.primary?.light
  };
  border-radius: 4px;
  padding: 15px ;
  // height: 94.24px; 
  width: 196px !important;;
`
);

export const RightWrapper = styled.div(
  {},
  ({ theme }) => `
  padding: 12px;
  background: ${theme?.primary?.dark};
  display: flex;
  border-radius: 6px;
  // @media screen and (max-width: 756px) {
  //   width: 36px;
  //   overflow: hidden;
  //   border-radius: 50%;
  //   padding: 9px 12px;
  //   margin-top: 1px;
  // }
`
);

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
/* @media screen and (max-width: 626px) {
position:absolute
left:10px
} */
`;

export const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap:24px;
  // flex-direction: column;
  // @media screen and (max-width: 756px) {
  //   flex-direction: row;
  // }
`;

export const BoxWrap = styled(Box)`
  gap:24px;
  // row-gap: 20px;
  // @media screen and (max-width: 1217px) {
  //   width: 70rem;
  // }
`;

export const BoxContent = styled(Box)`
  // @media screen and (max-width: 1217px) {
  //   width: 288%;
  //   overflow-x: scroll;
  //   &::-webkit-scrollbar {
  //     width: 2px;
  //     height: 4px;
  //     border-radius:20px;
  //     background-color: rgb(236, 241, 240);
  //   }
  //   &::-webkit-scrollbar-thumb {
  //     background-color: #808080;
  //     border-radius: 20px;
  //   }
`;

export const ConnectStyledItem = styled(Grid)(({ theme }) => ({
  cursor: 'pointer',
  columnGap: "17px",
  padding: "9px 8px",
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  border: "1px solid transparent",
  backgroundColor: theme?.primary?.popoverBg,
  maxWidth: "239px",
  width: "239px",
  "&:hover": {
    color: "#0FAE96",
    backgroundColor: "#F4FEFD",
    border: "1px solid #0FAE96",
    ".MuiTypography-root": {
      color: "#0FAE96",
    },
  },
  "&.selected": {
    color: "#0FAE96",
    backgroundColor: "#F4FEFD",
    border: "1px solid #0FAE96",
  },
}));
