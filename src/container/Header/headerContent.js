import { Box } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import CommonMenuItem from "../../components/Common/CommonMenuItem";
import {
  HeadConatiner,
  LeftConatiner,
  LeftMainConatiner,
  MainWrapper,
  RightWrapper,
} from "./Styled";
import ToggleButton from "../../components/ToggleButton/toggleButton";

const data = [
  { title: "24H Change", percentage: "0%" },
  { title: "Total Volume", percentage: "91.71 BTC" },
  { title: "Market Cap", percentage: "115 BTC" },
  { title: "Market Cap", percentage: "115 BTC" },
  { title: "Holders", percentage: "1,947" },
];
export const HeaderCard = (
  <Box display="flex" columnGap={"32px"} flexWrap="wrap">
    {data?.map((item, index) => (
      <HeadConatiner key={index}>
        <HeaderTypography fz="1em" fc="#808080">
          {item.title}
        </HeaderTypography>
        <HeaderTypography fw="500" fc="#2B2B2B" fz="1.5em">
          {item.percentage}
        </HeaderTypography>
      </HeadConatiner>
    ))}
  </Box>
);
const ImgData = ["social", "social-2", "social-3", "social-4"];

export const RightContent = (
  <LeftMainConatiner>
    <MainWrapper>
      <Box display="flex" alignItems={"center"} flexDirection={"column"}>
        <CommonMenuItem
          butonContent={
            <RightWrapper>
              <img src="/images/headerRight.svg" alt="svg"></img>
            </RightWrapper>
          }
        />
        <ToggleButton />
      </Box>

      <Box display="flex" alignItems="center" columnGap={"16px"}>
        {ImgData?.map((item) => {
          return (
            <>
              <img src={`/images/${item}.svg`} alt="icon"></img>
            </>
          );
        })}
      </Box>
    </MainWrapper>
  </LeftMainConatiner>
);
