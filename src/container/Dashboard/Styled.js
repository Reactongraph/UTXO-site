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

export const ProposalWrapper = styled.div`
  padding: 10px 29px;
  display: flex;
  gap: 30px;
  border: 1px solid #cbcbcb;
  box-shadow: 0px 4px 4px 0px #00000040;

  border-radius: 5px;
  width: fit-content;
`;

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

export const ProposalWrapperFilter = styled.div`
  padding: 10px 29px;
  display: flex;
  gap: 30px;
  border: 1px solid #cbcbcb;
  box-shadow: 0px 4px 4px 0px #00000040;

  border-radius: 5px;
  width: fit-content;
  @media screen and (max-width: 654px) {
    gap: 10px;
  padding: 10px;

  }

`;