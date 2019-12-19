import Slider from 'react-slick';
import React from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const CarouselContainer = styled.div`
    .slick-prev {
      left: 25px;
      z-index:5;
    }
    .slick-next {
      right: 25px ;
    }
  `;

  return (
    <CarouselContainer>
      <Slider {...settings}>
        <img src="banner1.png" />
        <img src="banner2.png" />
      </Slider>
    </CarouselContainer>
  );
};
