import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Div, HashTag } from './styled';
import { CustomPrevArrow, CustomNextArrow, CustomDotStyle } from './HashTagButton';

interface CarouselComponentProps {
  items: string[];
}

export const RealCarousel: React.FC<CarouselComponentProps> = ({ items }) => {
  return (
    <Div>
      <Carousel
        swipeable={true}
        showArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev) => (
          <CustomPrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} hasNext={true} label="Prev" />
        )}
        renderArrowNext={(onClickHandler, hasNext) => (
          <CustomNextArrow onClickHandler={onClickHandler} hasPrev={true} hasNext={hasNext} label="Next" />
        )}
        // renderIndicator={(clickHandler, isSelected, index) => (
        //   <CustomDotStyle clickHandler={clickHandler} isSelected={isSelected} index={index} label="Dot" />
        // )}
        centerMode={true}
        centerSlidePercentage={15}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay={true}
        autoFocus={true}
        infiniteLoop={true}
        dynamicHeight={true}>
        {items.map((item, index) => (
          <HashTag key={index}>{item}</HashTag>
        ))}
      </Carousel>
    </Div>
  );
};
