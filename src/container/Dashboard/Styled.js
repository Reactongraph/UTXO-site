import styled from "@emotion/styled";
export const ImageWrapper = styled.img``;

export const TitleWrapper = styled.div`
  background: black;
  color: #fff;
  position: absolute;
  bottom: 3px;
  right: 0;
  padding: 5px 30px;
  opacity: 0.7;
`;

export const ProposalWrapper = styled.div(
  {},
  ({ theme }) => `
  padding: 10px 29px;
  display: flex;
  height: fit-content;
  gap: 30px;
  border: 1px solid ${theme?.secondary?.tborderColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: fit-content;
  `
);

export const TableWrapper = styled.div`
  display: flex;
  column-gap: 30px;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 556px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
`;

export const TableWrapperFilter = styled.div`
  display: flex;
  column-gap: 30px;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  @media screen and (max-width: 456px) {
    font-size: 14px;
  }
`;

export const MainWrapper = styled.div`
  column-gap: 50px;
  margin-bottom: 38px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1140px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  @media screen and (max-width: 1024px) {
    column-gap: 25px;
  }
`;

export const ProposalWrapperFilter = styled.div(
  {},
  ({ theme }) => `
  padding: 10px 29px;
  display: flex;
  gap: 30px;
  border: 1px solid ${theme?.secondary?.tborderColor};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: ${theme?.secondary?.dark};
  width: fit-content;
  @media screen and (max-width: 654px) {
    gap: 10px;
    padding: 10px;
  }
  @media screen and (max-width: 367px) {
   flex-direction: column;
   width: 100%;
  }
`
);

export const DisplayGrid = styled.div(
  {},
  ({ theme }) => `
  background: ${
    theme?.palette?.mode === "light" &&
    "linear-gradient(91.18deg, #f0fcfb 49.99%,rgba(201, 255, 250, 0) 98.59%)"
  };
  width: 100%;
  height: 385px;
  position: absolute;
  top: -42px;
  @media screen and (max-width: 1227px) {
    height: 135%;
  }
`
);
