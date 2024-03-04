import styled from "styled-components";
import { Box, Button } from "@mui/material";

export const PrimaryButton = styled(Button)`
  border: 2px solid #05b858 !important;
  border-radius: 16px !important;
  padding: 12px 31.5px !important;
  font-size: 24px !important;
  line-height: 36px !important;
  font-weight: 400 !important;
  color: #05b858 !important;
  width: fit-content;
`;

export const StyledBox = styled(Box)`
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;
