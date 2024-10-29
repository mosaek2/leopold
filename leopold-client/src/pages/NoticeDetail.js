import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./NoticeDetail.css";

export default function NoticeDetail() {
    const [notice, setNotice] = useState();

    const { uid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/notice/${uid}`)
            .then((response) => {
                console.log(response.data);
                setNotice(response.data);
            })
            .catch((error) => alert(error.response.data));
    }, [uid]);

    const handleClickPrev = (e) => {
        navigate(``);
    };

    const handleClickNext = (e) => {
        navigate(``);
    };

    return (
        <>
            <WhiteHeader />
            <Main>
                <div id="noticeDetail-container">
                    {/* 메뉴 바 */}
                    <div className="noticeDetail-comm_title">
                        <ul className="noticeDetail-tab">
                            <li className="noticeDetail-on">
                                <Link to="/notices">
                                    <div className="noticeDetail-img">
                                        <img src="\images\Notice\cs_notice_on.svg" alt="확성기" />
                                    </div>
                                    <br />
                                    <div className="noticeDetail-txt">공지사항</div>
                                </Link>
                            </li>
                            <li className="noticeDetail-on">
                                <Link to="/downloads">
                                    <div className="noticeDetail-img">
                                        <img src="\images\Notice\cs_download.svg" alt="구름" />
                                    </div>
                                    <br />
                                    <div className="noticeDetail-txt">자료실</div>
                                </Link>
                            </li>
                            <li className="noticeDetail-on">
                                <Link to="/faq">
                                    <div className="noticeDetail-img">
                                        <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                                    </div>
                                    <br />
                                    <div className="noticeDetail-txt">FAQ</div>
                                </Link>
                            </li>
                            <li className="noticeDetail-on">
                                <Link to="/as">
                                    <div className="noticeDetail-img">
                                        <img src="\images\Notice\cs_as.svg" alt="스패너" />
                                    </div>
                                    <br />
                                    <div className="noticeDetail-txt">A/S 접수</div>
                                </Link>
                            </li>
                            <li className="noticeDetail-on">
                                <Link to="/review">
                                    <div className="noticeDetail-img">
                                        <img src="\images\Notice\cs_review.svg" alt="말풍선" />
                                    </div>
                                    <br />
                                    <div className="noticeDetail-txt">사용자 리뷰</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* 제목 */}
                    <div className="noticeDetail-titleArea">
                        <h2>공지사항</h2>
                        <p>Notice</p>
                    </div>
                    {/* 게시판 */}
                    <div className="noticeDetail-board">
                        <div className="noticeDetail-base-table">
                            <table>
                                <tbody>
                                    <tr className="noticeDetail-bd_title">
                                        <td>
                                            <div className="noticeDetail-t01">{notice?.title}</div>
                                            <div className="noticeDetail-t02">
                                                <span>{"Leopold"}</span>
                                                <span>{notice?.writeDate}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="noticeDetail-bd_content">
                                        <td>
                                            <div className="noticeDetail-fr-view">
                                                <img
                                                    src={notice?.imageUrl}
                                                    alt={notice?.title}
                                                    className="noticeDetail-fr-dib"
                                                />
                                                <p
                                                    dangerouslySetInnerHTML={{ __html: notice?.content }}
                                                />

                                                <p>
                                                    <span>
                                                        <strong
                                                            style={{
                                                                fontWeight: "bolder",
                                                                color: "rgb(26, 26, 26)",
                                                                fontFamily: "Inter, Pretendard, sans-serif",
                                                                fontSize: "28px",
                                                                textAlign: "center",
                                                                backgroundColor: "rgb(255, 255, 255)",
                                                            }}
                                                        >
                                                            <span style={{ color: "rgb(255, 108, 0)" }}>
                                                                {/* {
                                  "판매일정 : 2024년 9월 2일 월요일 오전 11시 판매 시작"
                                } */}
                                                            </span>
                                                        </strong>
                                                    </span>
                                                </p>
                                                <p>
                                                    <br />
                                                    <strong
                                                        style={{
                                                            fontWeight: "bolder",
                                                            color: "rgb(26, 26, 26)",
                                                            fontFamily: "Inter, Pretendard, sans-serif",
                                                            fontSize: "28px",
                                                            textAlign: "center",
                                                            backgroundColor: "rgb(255, 255, 255)",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "rgb(58, 50, 195)",
                                                                fontSize: "20px",
                                                            }}
                                                        >
                                                            {/* {
                                "* 위 일정은 제반 상황에 따라 변경될 수 있습니다."
                              } */}
                                                        </span>
                                                    </strong>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="noticeDetail-base-button">
                            <span>
                                <Link to={"/notices"}>목록</Link>
                            </span>
                        </div>
                    </div>
                    {/* 이전글/다음글 */}
                    <div className="noticeDetail-board-movement">
                        <ul>
                            <li className="noticeDetail-prev" onClick={handleClickPrev}>
                                <strong>이전글</strong>
                                {"프리미엄 알파셀 장패드 신규 출시"}
                            </li>
                            <li className="noticeDetail-next" onClick={handleClickNext}>
                                <strong>다음글</strong>
                                {"키보드 러그 이벤트 당첨자 발표"}
                            </li>
                        </ul>
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    );
}