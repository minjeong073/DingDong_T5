import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Div, HashTag } from "./styled";
 
interface CarouselComponentProps {
  items: JSX.Element[];
}

export const RealCarousel: React.FC<CarouselComponentProps> = ({ items }) => {
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  // };
  const carouselStyles ={
    height: '100px',
  }

  return (
    <Div>
      <Carousel
        swipeable={true}
        // draggable={true}
        // showDots={false}
        // responsive={responsive}
        // ssr={false}
        // infinite={true}
        // autoPlay={false}
        // autoPlaySpeed={3000}
        // keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={500}
        // containerClass="carousel-container"
        // removeArrowOnDeviceType={['tablet', 'mobile']}
        // deviceType="desktop"
        // dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding-40-px"
        // // Add any other required props here
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={10}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        dynamicHeight={true}
      >
        {items.map((item, index) => (
          <HashTag key={index}>{item}</HashTag>
        ))}
      </Carousel>
    </Div>
  );
};

