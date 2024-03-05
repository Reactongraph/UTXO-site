import { Box, useTheme } from "@mui/material";
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
import { useEffect, useState } from "react";

const data = [
  { title: "24H Change", percentage: "0%" },
  { title: "24H Volume", percentage: "0.1599 BTC" },
  { title: "Total Volume", percentage: "91.71 BTC" },
  { title: "Total Supply", percentage: "10,000" },
  { title: "Market Cap", percentage: "90 BTC" },
  { title: "Holders", percentage: "1,947" },
];

export const HeaderCard = ({ theme }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BoxContent>
      <BoxWrap display="flex" columnGap={"32px"} flexWrap="wrap">
        {windowWidth < 2030 && windowWidth > 576 ? (
          <Box id="header-slider-desk">
            <CommonSlider
              InitialShowNumber={3}
              responsiveArray={[]}
              CardContent={data?.map((item, index) => (
                <HeadConatiner key={index} theme={theme}>
                  <HeaderTypography
                    fz="1em"
                    fc={theme?.primary?.main}
                    marginBottom={"18px"}
                  >
                    {item.title}
                  </HeaderTypography>
                  <HeaderTypography
                    fw="500"
                    fc={theme?.primary?.main}
                    fz="1.5em"
                  >
                    {item.percentage}
                  </HeaderTypography>
                </HeadConatiner>
              ))}
            />
          </Box>
        ) : windowWidth < 576 ? (
          <Box id="header-slider">
            <CommonSlider
              InitialShowNumber={1}
              responsiveArray={[]}
              CardContent={data?.map((item, index) => (
                <HeadConatiner key={index} theme={theme}>
                  <HeaderTypography fz="1em" fc={theme?.primary?.main}>
                    {item.title}
                  </HeaderTypography>
                  <HeaderTypography
                    fw="500"
                    fc={theme?.primary?.main}
                    fz="1.5em"
                  >
                    {item.percentage}
                  </HeaderTypography>
                </HeadConatiner>
              ))}
            />
          </Box>
        ) : (
          data?.map((item, index) => (
            <HeadConatiner key={index} theme={theme}>
              <HeaderTypography fz="1em" fc={theme?.primary?.main}>
                {item.title}
              </HeaderTypography>
              <HeaderTypography fw="500" fc={theme?.primary?.main} fz="1.5em">
                {item.percentage}
              </HeaderTypography>
            </HeadConatiner>
          ))
        )}
      </BoxWrap>
    </BoxContent>
  );
};
const ImgData = ["social", "social-2", "social-3", "social-4"];

export const RightContent = ({ theme }) => (
  <LeftMainConatiner>
    <MainWrapper>
      <ToggleWrap>
        <CommonMenuItem
          theme={theme}
          butonContent={
            <RightWrapper theme={theme}>
              {theme?.mode === "light" ? (
                <img src="/images/headerRight.svg" alt="svg"></img>
              ) : (
                <img src="/images/headerRightDark.svg" alt="svg"></img>
              )}
            </RightWrapper>
          }
        />
        <ToggleButton />
      </ToggleWrap>
    </MainWrapper>
  </LeftMainConatiner>
);
