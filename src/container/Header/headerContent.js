import { Box } from "@mui/material";
import { HeaderTypography } from "../../components/Common/CommonTypography";
import CommonMenuItem from "../../components/Common/CommonMenuItem";
import {
  BoxContent,
  BoxWrap,
  HeadConatiner,
  LeftConatiner,
  LeftMainConatiner,
  MainWrapper,
  RightWrapper,
  ToggleWrap,
} from "./Styled";
import ToggleButton from "../../components/ToggleButton/toggleButton";
import CommonSlider from "../../components/Common/CommonSlider";

const data = [
  { title: "24H Change", percentage: "0%" },
  { title: "Total Volume", percentage: "91.71 BTC" },
  { title: "Market Cap", percentage: "115 BTC" },
  { title: "Market Cap", percentage: "115 BTC" },
  { title: "Holders", percentage: "1,947" },
];

export const HeaderCard = (
  <BoxContent>
    <BoxWrap
      display="flex"
      columnGap={"32px"}
      flexWrap="wrap"
      id="header-slider"
    >
      {window?.innerWidth < 1217 ? (
        <CommonSlider
          InitialShowNumber={1}
          responsiveArray={[]}
          CardContent={data?.map((item, index) => (
            <HeadConatiner key={index}>
              <HeaderTypography fz="1em" fc="#808080">
                {item.title}
              </HeaderTypography>
              <HeaderTypography fw="500" fc="#2B2B2B" fz="1.5em">
                {item.percentage}
              </HeaderTypography>
            </HeadConatiner>
          ))}
        />
      ) : (
        data?.map((item, index) => (
          <HeadConatiner key={index}>
            <HeaderTypography fz="1em" fc="#808080">
              {item.title}
            </HeaderTypography>
            <HeaderTypography fw="500" fc="#2B2B2B" fz="1.5em">
              {item.percentage}
            </HeaderTypography>
          </HeadConatiner>
        ))
      )}
    </BoxWrap>
  </BoxContent>
);
const ImgData = ["social", "social-2", "social-3", "social-4"];

export const RightContent = (
  <LeftMainConatiner>
    <MainWrapper>
      <ToggleWrap>
        <CommonMenuItem
          butonContent={
            <RightWrapper>
              <img src="/images/headerRight.svg" alt="svg"></img>
            </RightWrapper>
          }
        />
        <ToggleButton />
      </ToggleWrap>

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
