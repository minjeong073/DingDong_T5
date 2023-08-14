import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";

export const HashCarousal = () => {
    const settings = {
    	dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        dotsClass: "custom-dots"
    }
    // 사용할 Carousel의 기본 세팅을 해준다. props로 받아 와야 하기 때문에 객체에 넣어서 받아온다.
    // 더 많은 설정이 있지만, 그것은 직접 코드를 뜯어 보면 쉽게 알 수 있다.
    // 위의 설정은 홈페이지에 나와있는 기본 설정을 한번에 보여줄 갯수만 1개로 바꾼 것이다.
    
    return(
        <section className="page-carousel">
            <Slider {...settings}>
                <div>거창한 내용</div>
                <div>대단한 내용</div>
                <div>멋있는 내용</div>
                <div>예쁜 내용</div>
                <div>무언가 엄청난 내용</div>
            </Slider>
        </section>
    );
}
