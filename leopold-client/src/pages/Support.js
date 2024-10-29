import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import "./Notice.css";
import "./Support.css";

export default function Support() {
    return (
        <>
            <Header />
            <Main>
                <img
                    style={{ width: "100%" }}
                    src="\images\Support\고객지원 사진.jpg"
                />
                <div className="supoort-container">
                    <p className="top-text">고객지원</p>
                    <div className="notice-comm_title">
                        <ul style={{ marginTop: "-130px" }} className="notice-tab">
                            <li className="notice-on">
                                <Link to="/notices">
                                    <div className="notice-img">
                                        <img src="images\Download\cs_notice.svg" alt="확성기" />
                                    </div>
                                    <br />
                                    <div className="notice-txt">공지사항</div>
                                </Link>
                            </li>
                            <li className="notice-on">
                                <Link to="/downloads">
                                    <div className="notice-img">
                                        <img src="\images\Notice\cs_download.svg" alt="구름" />
                                    </div>
                                    <br />
                                    <div className="notice-txt">자료실</div>
                                </Link>
                            </li>
                            <li className="notice-on">
                                <Link to="/faq">
                                    <div className="notice-img">
                                        <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                                    </div>
                                    <br />
                                    <div className="notice-txt">FAQ</div>
                                </Link>
                            </li>
                            <li className="notice-on">
                                <Link to="/as">
                                    <div className="notice-img">
                                        <img src="\images\Notice\cs_as.svg" alt="스패너" />
                                    </div>
                                    <br />
                                    <div className="notice-txt">A/S 접수</div>
                                </Link>
                            </li>
                            <li className="notice-on">
                                <Link to="/review">
                                    <div className="notice-img">
                                        <img src="\images\Notice\cs_review.svg" alt="말풍선" />
                                    </div>
                                    <br />
                                    <div className="notice-txt">사용자 리뷰</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* 네비게이션 바 */}
                    <div className="box-container">
                        <Link to={"/one2one"}>
                            <div className="support-box">
                                <img src="\images\Support\qna 1.png" alt="qna"></img>
                                <p style={{ paddingTop: "24px" }}>1:1 문의하기</p>
                            </div>
                        </Link>
                        <div className="support-box">
                            <img src="\images\Support\contact 1.png" alt="contact"></img>
                            <p style={{ paddingTop: "24px" }}>고객센터</p>
                        </div>
                    </div>
                    <p className="offline-text">오프라인 매장안내</p>
                    <div className="offline-box-container">
                        <div className="offline-box">
                            <div className="location-box">
                                <img src="\images\Support\map 1.png" alt="map"></img>
                                <p className="location-text1">피씨기어</p>
                                <p style={{ paddingTop: "21px" }} className="location-text2">
                                    서울시 용산구 한강로2가 선인상가 21동 3층 105호
                                </p>
                                <div className="location-box2">
                                    <img
                                        style={{ width: "14px", height: "14px" }}
                                        src="\images\Support\phone 1.png"
                                        alt="phone"
                                    ></img>
                                    <p className="location-text2">02-701-8144</p>
                                </div>
                                <div className="goto-box">바로가기 →</div>
                            </div>
                        </div>
                        <div className="offline-box">
                            <div className="location-box">
                                <img src="\images\Support\map 1.png" alt="map"></img>
                                <p className="location-text1">리더스키</p>
                                <p style={{ paddingTop: "21px" }} className="location-text2">
                                    서울시 용산구 한강로2가 314-1 용성비즈텔 B2 218호
                                </p>
                                <div className="location-box2">
                                    <img
                                        style={{ width: "14px", height: "14px" }}
                                        src="\images\Support\phone 1.png"
                                        alt="phone"
                                    ></img>
                                    <p className="location-text2">010-4231-3686</p>
                                </div>
                                <div className="goto-box">바로가기 →</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    );
}