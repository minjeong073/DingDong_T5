// import React, { useState, useEffect, useCallback } from "react";
// import dummy from '../../db/articles.json';
// import { HashBody, Tr, HashTag, Div, HashButton } from './styled';
// import useEmblaCarousel, {
//   EmblaCarouselType,
//   EmblaOptionsType
// } from 'embla-carousel-react';
// import { PrevButton, NextButton } from "./HashTagButton";
// import './embla.css';
// import { Carousel } from "react-responsive-carousel";


// type PropType = {
//   slides: number[]
//   options?: EmblaOptionsType
// }

// export const HashCarousal: React.FC<PropType> = (props) => {
//   // 많이 언급된 hashtag 순서대로 정렬한 api 호출

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//       partialVisibilityGutter: 40,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       partialVisibilityGutter: 30,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//       partialVisibilityGutter: 30,
//     },
//   };

//   const HashtagArr = dummy.articles.map(item => item.hashtag);
//   const oneHashtag = HashtagArr.flat();
//   const onlyHashtag = Array.from(new Set(oneHashtag)).slice(0, 13);
//   console.log(onlyHashtag);

//   const { slides, options } = props;
//   const [ emblaRef, emblaApi ] = useEmblaCarousel(options);
//   const [ prevBtnDisabled, setPrevBtnDisabled ] = useState(true);
//   const [ nextBtnDisabled, setNextBtnDisabled ] = useState(true);
//   // const [ selectedIndex, setSelectedIndex ] = useState(0);
//   // const [ scrollSnaps, setScrollSnaps ] = useState<number[]>([]); 
  
//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi?.scrollPrev(),
//     [emblaApi]
//   );

//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi]
//   );

//   // const scrollTo = useCallback(
//   //   (index: number ) => emblaApi && emblaApi.scrollTo(index),
//   //   [emblaApi]
//   // );

//   // const onInit = useCallback((emblaApi: EmblaCarouselType) => {
//   //   setScrollSnaps(emblaApi.scrollSnapList())
//   // }, []);

//   const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
//     // setSelectedIndex(emblaApi.selectedScrollSnap())
//     setPrevBtnDisabled(!emblaApi.canScrollPrev)
//     setNextBtnDisabled(!emblaApi.canScrollNext())
//   }, []);

//   useEffect(() => {
//     if(!emblaApi) return

//     // onInit(emblaApi)
//     onSelect(emblaApi)
//     // emblaApi.on('reInit', onInit)
//     emblaApi.on('reInit', onSelect)
//     emblaApi.on('select', onSelect)
//   }, [emblaApi, {/*onInit,*/}, onSelect]);
  
//   return (
//     <>
//       {/* <div className="embla">
//         <div className="embla__viewport" ref={emblaRef}>
//           <div className="embla__container">
//             {slides.map((index) => (
//               <div className="embla__slide" key={index}>
//                 <div className="embla__slide__number">
//                   <span>{index + 1}</span>
//                 </div>
//                 <HashTag key={index}>{onlyHashtag[index]}</HashTag> 
//                 {/* <HashTag key={index+1}>{onlyHashtag[index+1]}</HashTag> */}
//               {/*</div>
//             ))}
//           </div>
//         </div>

//         <div className="embla__buttons">
//           <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
//           <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
//         </div>
//       </div> */}
//       <Carousel
//       // additionalTransfrom={0}
//       // arrows
//       // autoPlay
//       // autoPlaySpeed={1}
//       // centerMode={false}
//       // className=""
//       // containerClass="container-with-dots"
//       // customTransition="all 15s linear"
//       // dotListClass=""
//       // draggable
//       // focusOnSelect={false}
//       // infinite
//       // itemClass=""
//       // keyBoardControl
//       // minimumTouchDrag={80}
//       // pauseOnHover
//       // renderArrowsWhenDisabled={false}
//       // renderButtonGroupOutside={false}
//       // renderDotsOutside={false}
//       // responsive={{
//       //   desktop: {
//       //     breakpoint: {
//       //       max: 3000,
//       //       min: 1024
//       //     },
//       //     items: 3,
//       //     partialVisibilityGutter: 40
//       //   },
//       //   mobile: {
//       //     breakpoint: {
//       //       max: 464,
//       //       min: 0
//       //     },
//       //     items: 1,
//       //     partialVisibilityGutter: 30
//       //   },
//       //   tablet: {
//       //     breakpoint: {
//       //       max: 1024,
//       //       min: 464
//       //     },
//       //     items: 2,
//       //     partialVisibilityGutter: 30
//       //   }
//       // }}
//       // rewind={false}
//       // rewindWithAnimation={false}
//       // rtl={false}
//       // shouldResetAutoplay
//       // showDots={false}
//       // sliderClass=""
//       // slidesToSlide={2}
//       // swipeable
//       // transitionDuration={1000}
//       showArrows={true}
//       autoPlay={true}
//       infiniteLoop={true}
//       showThumbs={false}
//       interval={3000}

//       >
        
//       </Carousel>
//     </>
//   );
// };

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HashCarousal() {
	const settings = {
    	dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    // 사용할 Carousel의 기본 세팅을 해준다. props로 받아 와야 하기 때문에 객체에 넣어서 받아온다.
    // 더 많은 설정이 있지만, 그것은 직접 코드를 뜯어 보면 쉽게 알 수 있다.
    // 위의 설정은 홈페이지에 나와있는 기본 설정을 한번에 보여줄 갯수만 1개로 바꾼 것이다.
    
{    <section className="page-carousel">
    	<Slider {...settings}>
        	<div>거창한 내용</div>
            <div>대단한 내용</div>
            <div>멋있는 내용</div>
            <div>예쁜 내용</div>
            <div>무언가 엄청난 내용</div>
        </Slider>
    </section>}
}

export default HashCarousal;