import styled from "@emotion/styled";

export const LeftConatiner = styled.div`
  display: flex;
  gap: 42px;
  align-items: center;
`;

export const RightContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const HeadConatiner = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  @media screen and (max-width: 1280px) {
    display: none;
  }
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
  @media screen and (max-width: 626px) {
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
