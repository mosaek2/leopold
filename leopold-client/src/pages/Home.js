import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import SmallBanner from "../components/SmallBanner";
import "./Home.css";

export default function Home() {
    return (
        <div className="Home">
            <Header />
            <Main>
                <Banner></Banner>
                <div>
                    <div className="best-prouduct">
                        <div className="yello-picture">
                            <img src="\images\Home\사람.jpg" alt="사람 이미지"></img>
                        </div>
                        <div className="best-prouduct-group">
                            <p
                                className="home-title-boldtext"
                            >
                                BEST PRODUCT
                            </p>
                            <p
                                className="home-title-lighttext"
                                style={{ paddingTop: "20px" }}
                            >
                                올 한해, 가장 많이 사랑받은 베스트셀러 <br /> 다양한 색상으로
                                나만의 키보드를 지금 만나보세요.
                            </p>
                        </div>
                        <SmallBanner></SmallBanner>
                    </div>

                    <div className="leopold-container">
                        <p className="home-title-boldtext" style={{ marginTop: "196px" }}>
                            LEOPOLD
                        </p>
                        <p className="home-title-lighttext" style={{ paddingTop: "12px" }}>
                            블루투스 기계식 키보드
                        </p>
                        <div className="leopold-group">
                            <div className="bluetooth-container">
                                <img src="\images\Home\Bluetooth.png"></img>
                                <p className="leopold-boldtext">Bluetooth 5.1</p>
                                <p className="leopold-light">안정적이며 끊김 없는 무선 연결</p>
                            </div>
                            <div className="sound-container">
                                <img src="\images\Home\Sound.png"></img>
                                <p className="leopold-boldtext">Sound Absorbing Pad</p>
                                <p className="leopold-light">
                                    레오폴드 최초 도입 키보드 내부 흡음패드
                                </p>
                            </div>
                            <div className="pbt-container">
                                <img src="\images\Home\PBT.png"></img>
                                <p className="leopold-boldtext">PBT Double-Shot</p>
                                <p className="leopold-light">자체 개발 PBT 이중사출 키캡</p>
                            </div>
                            <div className="cherry-container">
                                <img src="images\Home\cherry.png"></img>
                                <p className="leopold-boldtext">CHERRY Switch</p>
                                <p className="leopold-light">독일 체리 MX/MX2A 스위치 채용</p>
                            </div>
                        </div>
                        <div className="click-block">자세히 보기 →</div>
                    </div>

                    <div className="classic">
                        <img src="\images\Home\클래식 배경.jpg" />
                        <p className="classic-text">Classic is, Leopold</p>
                    </div>
                    <div className="service-container">
                        <p className="home-title-boldtext" style={{ marginTop: "96px" }}>
                            SERVICE
                        </p>
                        <p className="home-title-lighttext" style={{ marginTop: "25px" }} >
                            궁금한 점이 있으신가요? <br /> 레오폴드가 키보드
                            그 이상의 가치를 느끼게 해드립니다
                        </p>
                        <div className="service-group">
                            <Link to="/one2one">
                                <div className="service-box">
                                    <img style={{ marginTop: "35px" }} src="\images\Home\문의.png"></img>
                                    <p className="service-boldtext">1:1 문의</p>
                                    <p className="service-light">
                                        궁금하신 사항을 문의해 주세요.  <br /> 최선을 다해 답변해 드리겠습니다.
                                    </p>
                                </div>
                            </Link>

                            <Link to="/as">
                                <div className="service-box">
                                    <img style={{ marginTop: "35px" }} src="\images\Home\AS.png"></img>
                                    <p className="service-boldtext">A/S 접수</p>
                                    <p className="service-light">
                                        도움이 필요하시면 언제든지 문의해주세요.  <br /> 최대한 빠르게 도움 드리겠습니다.
                                    </p>
                                </div>
                            </Link>

                            <Link to="/faq">
                                <div className="service-box">
                                    <img style={{ marginTop: "35px" }} src="\images\Home\FAQ.png"></img>
                                    <p className="service-boldtext">FAQ</p>
                                    <p className="service-light">
                                        고객님들의 자주 묻는 질문을  <br /> 확인 해보세요.
                                    </p>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </Main>
            <Footer />
        </div>
    );
}