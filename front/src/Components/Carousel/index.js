import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
const items = [
  {
     src:'banner1.png',
  },
  {
    src: 'banner2.png',
  },
];

const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const ImageWrapper=styled.div``
  
  const customTag={
    maxWidth: "100%",
    height: "400px",
    background: "gray"
  }

  const CarouselImage=styled.img`
    width:100%;
    height:400px;
  `
  const slides = items.map((item) => {
    return (
      <CarouselItem
        style={customTag}
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <ImageWrapper>
        <CarouselImage src={item.src} alt={item.altText} />
        </ImageWrapper>
      </CarouselItem>
    );
  });
  return (
    <div>

      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
  );
}

export default Example;