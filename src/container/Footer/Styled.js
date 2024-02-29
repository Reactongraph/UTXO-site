import styled from "styled-components";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import { Box } from "@mui/material";

export const WrapperFirst = styled.img`
  @media screen and (max-width: 654px) {
    width: 70%;
  }
`;
export const WrapperSecond = styled.img`
  @media screen and (max-width: 654px) {
    width: 15%;
    min-width: 28px;
  }
`;
export const WrapperThird = styled.div`
  height: 37px;
  display: flex;
  alignitems: center;
  marginbottom: 9px;
  color: #fff;
  fontsize: 1.25em;
  @media screen and (max-width: 654px) {
    font-size: 16px;
  }
`;

export const ResponsiveHeaderTypography = styled(HeaderTypography)`
  @media screen and (max-width: 654px) {
    font-size: 12px;
  }
`;

export const HiddenOnMobile = styled(Box)`
  column-gap: 73px;
  @media screen and (max-width: 510px) {
    column-gap: 20px;
  }
`;
