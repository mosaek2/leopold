import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="center">
      <Swiper
        className="banner"
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        speed={2000}
        loop={true}
        loopAddBlankSlides={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        style={{ "--swiper-navigation-color": "white" }}
      >
        <SwiperSlide>
          <img src="\images\Home\슬라이드1.png"></img>
          <div className="text-container">
            <p className="text1">Wired & Wireless Series</p>
            <p className="text2">MILK TURQUOISE</p>
            <p className="text3">자세히 보기 →</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="\images\Home\슬라이드2.png"></img>
          <div className="text-container">
            <p className="text1">Wired & Wireless Series</p>
            <p className="text2">CORAL BLUE</p>
            <p className="text3">자세히 보기 →</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="\images\Home\슬라이드3.jpg"></img>
          <div className="text-container">
            <p className="text1">The New CHERRY Switch</p>
            <p className="text2">MX24 Series</p>
            <p className="text3">자세히 보기 →</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
