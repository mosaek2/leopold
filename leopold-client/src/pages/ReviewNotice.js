import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./ReviewNotice.css";

export default function ReviewNotice() {
    return (
        <>
            <WhiteHeader />
            <Main>
                {/* 메뉴 바 */}
                <div className="reviewNotice-comm_title">
                    <ul className="reviewNotice-tab">
                        <li className="reviewNotice-on">
                            <Link to="/notices">
                                <div className="reviewNotice-img">
                                    <img src="\images\Download\cs_notice.svg" alt="확성기" />
                                </div>
                                <br />
                                <div className="reviewNotice-txt">공지사항</div>
                            </Link>
                        </li>
                        <li className="reviewNotice-on">
                            <Link to="/downloads">
                                <div className="reviewNotice-img">
                                    <img src="\images\Notice\cs_download.svg" alt="구름" />
                                </div>
                                <br />
                                <div className="reviewNotice-txt">자료실</div>
                            </Link>
                        </li>
                        <li className="reviewNotice-on">
                            <Link to="/faq">
                                <div className="reviewNotice-img">
                                    <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                                </div>
                                <br />
                                <div className="reviewNotice-txt">FAQ</div>
                            </Link>
                        </li>
                        <li className="reviewNotice-on">
                            <Link to="/as">
                                <div className="reviewNotice-img">
                                    <img src="\images\Notice\cs_as.svg" alt="스패너" />
                                </div>
                                <br />
                                <div className="reviewNotice-txt">A/S 접수</div>
                            </Link>
                        </li>
                        <li className="reviewNotice-on">
                            <Link to="/review">
                                <div className="reviewNotice-img">
                                    <img src="\images\Review\cs_review_on.svg" alt="말풍선" />
                                </div>
                                <br />
                                <div className="reviewNotice-txt">사용자 리뷰</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* 제목 */}
                <div className="reviewNotice-titleArea">
                    <h2>사용자 리뷰</h2>
                    <p>User review</p>
                </div>
                {/* 게시판 */}
                <div className="reviewNotice-board">
                    <div className="reviewNotice-base-table">
                        <table>
                            <tbody>
                                <tr className="reviewNotice-bd_title">
                                    <td>
                                        <div className="reviewNotice-t01">
                                            {"리얼포스 소프트웨어 프로그램"}
                                        </div>
                                        <div className="reviewNotice-t02">
                                            <span>{"Leopold"}</span>
                                            <span>{"2023.08.29"}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="reviewNotice-bd_content">
                                    <td>
                                        <div className="reviewNotice-fr-view">
                                            <p>
                                                <br />
                                            </p>
                                            <p>
                                                <span>{"안녕하세요."}</span>
                                                <span>{"레오폴드 입니다 :)"}</span>
                                            </p>
                                            <p>
                                                <br />
                                            </p>
                                            <p>
                                                <span>
                                                    {
                                                        "사용자 리뷰 게시판은 레오폴드의 상품 또는 서비스를 다른 분들께 공유 하거나 사용 후기를 남기는 공간입니다."
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    {
                                                        "궁금하신 사항이나 문의 글은 1:1 문의 게시판을 통해 접수 부탁 드립니다."
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <br />
                                            </p>
                                            <p>
                                                <span>
                                                    {
                                                        "게시판 성격에 맞지 않는 내용이거나 욕설 등은 관리자에 의해 임의로 삭제 처리 될 수 있으니 참고해 주시기 바랍니다. "
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    {
                                                        "언제나 고객님들의 만족을 위해 최선을 다하는 레오폴드가 되겠습니다."
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <span>{"감사합니다."}</span>
                                            </p>
                                            <p>
                                                <br />
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* 목록 버튼 */}
                    <div className="reviewNotice-base-button">
                        <span>
                            <Link to={"/review"}>목록</Link>
                        </span>
                    </div>
                </div>
                {/* 댓글 달기 */}
                <div className="reviewNotice-board-comment">
                    <div className="write-comment-container">
                        <p className="write-comment-text">댓글달기</p>
                        <textarea className="write-comment-content"></textarea>
                        <div>
                            <button className="write-comment-check">확인</button>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    );
}