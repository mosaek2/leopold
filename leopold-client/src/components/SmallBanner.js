import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";
import "./SmallBanner.css";

export default function SmallBanner() {


    return (
        <div className="center">
            <Swiper
                className="samll-banner"
                modules={[Navigation]}
                spaceBetween={-50}
                slidesPerView={3}
                speed={1000}
                loop={true}
                loopAddBlankSlides={1}
                navigation={true}
                style={{
                    "--swiper-navigation-size": "30px",
                    "--swiper-theme-color": "#aeaeae",
                    width: "1009px",
                    margin: "-300px 0px 0px 780px",
                    position: "relative"
                }}
            >
                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px", position: "relative" }}
                        src="\images\Home\미니 슬라이드1.jpg"
                        alt="slide1"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT MX2A 화이트 투톤</p>
                        <p className="information-price">178,000원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드2.jpg"
                        alt="slide2"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT MX2A 그라파이트 블루</p>
                        <p className="information-price">178,000원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드 3.jpg"
                        alt="slide3"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT MX2A 코랄 블루</p>
                        <p className="information-price">178,000원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드4.jpg"
                        alt="slide4"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT MX2A 그레이 블루</p>
                        <p className="information-price">178,000원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드5.jpg"
                        alt="slide5"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">R3 BT 그레이 블루 저소음 APC</p>
                        <p className="information-price">395,000원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드6.jpg"
                        alt="slide6"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT PD 그레이 블루</p>
                        <p className="information-price">146,500원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드7.jpg"
                        alt="slide7"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT PD 밀크 터쿼이즈</p>
                        <p className="information-price">146,500원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드8.jpg"
                        alt="slide8"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT PD 화이트 투톤</p>
                        <p className="information-price">146,500원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드9.jpg"
                        alt="slide9"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT PD 코랄 블루</p>
                        <p className="information-price">146,500원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="small-banner">
                    <img
                        style={{ width: "260px", height: "260px", borderRadius: "10px" }}
                        src="\images\Home\미니 슬라이드 10.jpg"
                        alt="slide10"
                    ></img>
                    <div className="information-box">
                        <p className="information-text">FC900RBT PD 화이트 그레이</p>
                        <p className="information-price">146,500원</p>
                        <div className="information-cart"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}