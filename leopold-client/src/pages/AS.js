import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsSub from "../components/AsSub";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import { ContextSystem } from "../functions/MyContext";
import "./AS.css";

export default function AS() {
    const navigate = useNavigate();
    const [category, setCategory] = useState(1);
    const [asList_1, setAsList_1] = useState([]);
    const [asList_2, setAsList_2] = useState([]);
    const { get } = useContext(ContextSystem);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/as`)
            .then((res) => {
                console.log(res.data);
                setAsList_1(
                    res.data.filter(asList => asList.category === 1)
                );
                setAsList_2(
                    res.data.filter(asList => asList.category === 2)
                );
            })
            .catch((err) => {
                console.log(err.res.data);
            });
    }, []);

    function handleButtonClick() {
        if (get.isLogin === false) {
            alert("회원에게만 글쓰기 권한이 있습니다.");
        } else {
            navigate("/asReception")
        }
    }

    return (
        <>
            <WhiteHeader />
            <Main>
                {/* 게시판 메인 */}
                <div className="as-community_list">
                    {/* 메뉴 바 */}
                    <div className="as-comm_title">
                        <ul className="as-tab">
                            <li className="as-on">
                                <Link to="/notices">
                                    <div className="as-img">
                                        <img src="\images\Download\cs_notice.svg" alt="확성기" />
                                    </div>
                                    <br />
                                    <div className="as-txt">공지사항</div>
                                </Link>
                            </li>
                            <li className="as-on">
                                <Link to="/downloads">
                                    <div className="as-img">
                                        <img src="\images\Notice\cs_download.svg" alt="구름" />
                                    </div>
                                    <br />
                                    <div className="as-txt">자료실</div>
                                </Link>
                            </li>
                            <li className="as-on">
                                <Link to="/faq">
                                    <div className="as-img">
                                        <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                                    </div>
                                    <br />
                                    <div className="as-txt">FAQ</div>
                                </Link>
                            </li>
                            <li className="as-on">
                                <Link to="/as">
                                    <div className="as-img">
                                        <img src="\images\AS\cs_as_on.svg" alt="스패너" />
                                    </div>
                                    <br />
                                    <div className="as-txt">A/S 접수</div>
                                </Link>
                            </li>
                            <li className="as-on">
                                <Link to="/review">
                                    <div className="as-img">
                                        <img src="\images\Notice\cs_review.svg" alt="말풍선" />
                                    </div>
                                    <br />
                                    <div className="as-txt">사용자 리뷰</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* 제목 */}
                    <div className="as-titleArea">
                        <h2>A/S 안내</h2>
                        <p>After Service</p>
                    </div>
                    {/* 네비게이션 바 */}
                    <div id="as-navi">
                        <ul className="as-navi_cboth">
                            <li
                                className={category === 1 ? "as-category-on" : ""}
                                onClick={() => setCategory(1)}
                            >
                                <span>A/S 필독사항</span>
                            </li>
                            <p>|</p>
                            <li
                                className={category === 2 ? "as-category-on" : ""}
                                onClick={() => setCategory(2)}
                            >
                                <span>A/S 접수안내</span>
                            </li>
                        </ul>
                    </div>
                    {/* Q & A */}
                    <div className="as-cboth_questions">
                        <ul>
                            <li className="as-has-sub">
                                {category === 1
                                    ? asList_1.map((list, index) => (
                                        <AsSub list={list} key={index} />
                                    ))
                                    : ""}
                                {category === 2
                                    ? asList_2.map((list, index) => (
                                        <AsSub list={list} key={index} />
                                    ))
                                    : ""}
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 접수하기 버튼*/}
                <div className="as-btn">
                    <span className="as-gRight">
                        <div className="as-btnSubmit" onClick={handleButtonClick}>
                            접수하기
                        </div>
                    </span>
                </div>
                {/* 스스로 해결방법 */}
                <div className="as-self">
                    <div className="as-tit">스스로 해결방법</div>
                    <div className="as-wrap2">
                        <div>
                            <Link
                                to={"https://www.youtube.com/channel/UCG9XHvC24e3NFSCMVbBGu7w"}
                            >
                                <div className="as-img2">
                                    <img src="\images\AS\faq01.png" alt="유튜브" />
                                </div>
                                <div className="as-text">
                                    <span className="as-t01">동영상</span>
                                    <span className="as-t02">
                                        동영상 가이드를 활용하여 문제점을 해결해보세요.
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div>
                            <Link to={"/downloads"}>
                                <div className="as-img2">
                                    <img src="\images\AS\faq02.png" alt="자료실" />
                                </div>
                                <div className="as-text">
                                    <span className="as-t01">다운로드 자료실</span>
                                    <span className="as-t02">
                                        제품에 관련된 유용한 자료를 다운로드 할 수 있습니다.
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div>
                            <Link to={"/downloads"}>
                                <div className="as-img2">
                                    <img src="\images\AS\faq03.png" alt="리포트" />
                                </div>
                                <div className="as-text">
                                    <span className="as-t01">자가진단</span>
                                    <span className="as-t02">
                                        간편하게 스스로 문제점 확인 후 해결해 보세요.
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    );
}