/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { HeaderTypography } from '@/components/common/typography/Typography';
import { BoxContent, BoxWrap, HeadConatiner, LeftMainConatiner, MainWrapper, RightWrapper, ToggleWrap } from './styled';
import CommonSlider from '@/components/common/slider/Slider';
import CommonMenuItem from '@/components/common/menuItem/MenuItem';
import ToggleButton from '@/components/common/toggleButton/ToggleButton';

const data = [
  { title: '24H Change', percentage: '0%' },
  { title: '24H Volume', percentage: '0.1599 BTC' },
  { title: 'Total Volume', percentage: '91.71 BTC' },
  { title: 'Total Supply', percentage: '10,000' },
  { title: 'Market Cap', percentage: '90 BTC' },
  { title: 'Holders', percentage: '1,947' }
];

export const HeaderCard = ({ theme }: { theme: any }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const determineInitialShowNumber = (windowWidth: number) => {
    if (windowWidth < 1280) {
      return 1;
    } else if (windowWidth < 1480) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <BoxContent>
      <BoxWrap display="flex" columnGap={'32px'} flexWrap="wrap">
        {windowWidth < 2035 && windowWidth > 576 ? (
          <Box id="header-slider-desk">
            <CommonSlider
              InitialShowNumber={determineInitialShowNumber(windowWidth)}
              responsiveArray={[]}
              CardContent={data?.map((item, index) => (
                <HeadConatiner key={index} theme={theme}>
                  <HeaderTypography fz="1em" fc={theme?.primary?.main} marginBottom={'18px'}>
                    {item.title}
                  </HeaderTypography>
                  <HeaderTypography fw="500" fc={theme?.primary?.main} fz="1.5em">
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
                  <HeaderTypography fw="500" fc={theme?.primary?.main} fz="1.5em">
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

export const RightContent = ({ theme }: { theme: any }) => (
  <LeftMainConatiner>
    <MainWrapper>
      <ToggleWrap>
        <CommonMenuItem
          theme={theme}
          butonContent={
            <RightWrapper theme={theme}>
              {theme?.mode === 'light' ? (
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
