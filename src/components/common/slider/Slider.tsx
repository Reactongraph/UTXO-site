import React from 'react';
import Slider from 'react-slick';
import { Box, useTheme } from '@mui/material';

// Define the type for the props of CommonSlider
interface CommonSliderProps {
  InitialShowNumber?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsiveArray?: any;
  CardContent?: React.ReactNode;
}

function CommonSlider({ InitialShowNumber = 3, responsiveArray, CardContent }: CommonSliderProps) {
  const theme = useTheme();

  function SampleNextArrow(props: { style?: React.CSSProperties; onClick?: () => void }) {
    const { style, onClick } = props;
    return (
      <div className="slick-arrow" style={{ ...style, display: 'block' }} onClick={onClick}>
        <img src={theme?.palette?.mode === 'light' ? '/images/right-arrow.svg' : '/images/arrow-right-dark.svg'} alt="arrow_left" />
      </div>
    );
  }

  function SamplePrevArrow(props: { style?: React.CSSProperties; onClick?: () => void }) {
    const { style, onClick } = props;
    return (
      <div className="slick-arrow-left" style={{ ...style, display: 'block' }} onClick={onClick}>
        <img src={theme?.palette?.mode === 'light' ? '/images/left-arrow.svg' : '/images/arrow-left-dark.svg'} alt="arrow_left" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: InitialShowNumber,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: responsiveArray
      ? responsiveArray
      : [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: InitialShowNumber
            }
          },
          {
            breakpoint: 956,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: InitialShowNumber
            }
          },
          {
            breakpoint: 556,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: InitialShowNumber
            }
          }
        ]
  };

  const Cards = ['card', 'card2', 'card3'];
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {CardContent
          ? CardContent
          : Cards?.map((item, i) => {
              return (
                <Box key={i} id="slider-wrap">
                  <img src={`/images/${item}.svg`} alt="icon"></img>
                </Box>
              );
            })}
      </Slider>
    </div>
  );
}

export default CommonSlider;
