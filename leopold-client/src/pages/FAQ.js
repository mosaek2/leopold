import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FaqSub from "../components/FaqSub";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./FAQ.css";

export default function FAQ() {
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();

    const [faqList, setFaqList] = useState([]);
    const [totalElements, setTotalElements] = useState();

    const [activeIndexCategory1, setActiveIndexCategory1] = useState(null);
    const [activeIndexCategory2, setActiveIndexCategory2] = useState(null);
    const [activeIndexCategory3, setActiveIndexCategory3] = useState(null);
    const [activeIndexCategory4, setActiveIndexCategory4] = useState(null);

    // 각 카테고리별로 handleToggle 함수를 구분
    const handleToggleCategory1 = (index) => {
        setActiveIndexCategory1(activeIndexCategory1 === index ? null : index);
    };

    const handleToggleCategory2 = (index) => {
        setActiveIndexCategory2(activeIndexCategory2 === index ? null : index);
    };

    const handleToggleCategory3 = (index) => {
        setActiveIndexCategory3(activeIndexCategory3 === index ? null : index);
    };

    const handleToggleCategory4 = (index) => {
        setActiveIndexCategory4(activeIndexCategory4 === index ? null : index);
    };

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
    const categoryUid = queryParams.get("category")
        ? parseInt(queryParams.get("category"))
        : 1;

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/faq?page=${page}&size=${size}&category=${categoryUid}`
            )
            .then((response) => {
                console.log(response.data);
                setFaqList(response.data.list);
                setTotalElements(response.data.totalElements);
            })
            .catch((error) => {
                alert(error.response.data);
            });
    }, [page, size, categoryUid]);

    const handleCategoryClick = (categoryUid) => {
        navigate(`/faq?page=1&size=10&category=${categoryUid}`);
    };

    // const printFaqList = faqList.map((faq, index) => (
    //   <FaqSub faq={faq} key={faqList.uid} index={index} page={page} size={size} />
    // ));

    return (
        <>
            <WhiteHeader />
            <Main>
                {/* 메뉴 바 */}
                <div className="faq-comm_title">
                    <ul className="faq-tab">
                        <li className="faq-on">
                            <Link to="/notices">
                                <div className="faq-img">
                                    <img src="images\Download\cs_notice.svg" alt="확성기" />
                                </div>
                                <br />
                                <div className="faq-txt">공지사항</div>
                            </Link>
                        </li>
                        <li className="faq-on">
                            <Link to="/downloads">
                                <div className="faq-img">
                                    <img src="images\Notice\cs_download.svg" alt="구름" />
                                </div>
                                <br />
                                <div className="faq-txt">자료실</div>
                            </Link>
                        </li>
                        <li className="faq-on">
                            <Link to="/faq">
                                <div className="faq-img">
                                    <img src="images\FAQ\cs_faq_on.svg" alt="보고서" />
                                </div>
                                <br />
                                <div className="faq-txt">FAQ</div>
                            </Link>
                        </li>
                        <li className="faq-on">
                            <Link to="/as">
                                <div className="faq-img">
                                    <img src="images\Notice\cs_as.svg" alt="스패너" />
                                </div>
                                <br />
                                <div className="faq-txt">A/S 접수</div>
                            </Link>
                        </li>
                        <li className="faq-on">
                            <Link to="/review">
                                <div className="faq-img">
                                    <img src="images\Notice\cs_review.svg" alt="말풍선" />
                                </div>
                                <br />
                                <div className="faq-txt">사용자 리뷰</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* 제목 */}
                <div className="faq-titleArea">
                    <h2>FAQ</h2>
                    <p>자주 하는 질문</p>
                </div>
                {/* 네비게이션 바 */}
                <div id="faq_navi">
                    <ul className="faq-navi_cboth">
                        <li
                            className={categoryUid == 1 ? "faq-category-on" : ""}
                            onClick={() => handleCategoryClick(1)}
                        >
                            <span>주문/결제/배송</span>
                        </li>
                        <p>|</p>
                        <li
                            className={categoryUid == 2 ? "faq-category-on" : ""}
                            onClick={() => handleCategoryClick(2)}
                        >
                            <span>취소/교환/반품</span>
                        </li>
                        <p>|</p>
                        <li
                            className={categoryUid == 3 ? "faq-category-on" : ""}
                            onClick={() => handleCategoryClick(3)}
                        >
                            <span>상품/기술지원</span>
                        </li>
                        <p>|</p>
                        <li
                            className={categoryUid == 4 ? "faq-category-on" : ""}
                            onClick={() => handleCategoryClick(4)}
                        >
                            <span>기타</span>
                        </li>
                    </ul>
                </div>
                {/* Q & A */}
                <div className="faq-cboth_questions">
                    <ul>
                        <li className="faq-has-sub">
                            {categoryUid === 1 &&
                                faqList.map((faq, index) => (
                                    <FaqSub
                                        faq={faq}
                                        key={index}
                                        index={index}
                                        page={page}
                                        size={size}
                                        handleToggle={handleToggleCategory1} // 카테고리 1의 토글
                                        active={activeIndexCategory1} // 카테고리 1의 활성화 상태
                                    />
                                ))}
                            {categoryUid === 2 &&
                                faqList.map((faq, index) => (
                                    <FaqSub
                                        faq={faq}
                                        key={index}
                                        index={index}
                                        page={page}
                                        size={size}
                                        handleToggle={handleToggleCategory2} // 카테고리 2의 토글
                                        active={activeIndexCategory2} // 카테고리 2의 활성화 상태
                                    />
                                ))}
                            {categoryUid === 3 &&
                                faqList.map((faq, index) => (
                                    <FaqSub
                                        faq={faq}
                                        key={index}
                                        index={index}
                                        page={page}
                                        size={size}
                                        handleToggle={handleToggleCategory3} // 카테고리 3의 토글
                                        active={activeIndexCategory3} // 카테고리 3의 활성화 상태
                                    />
                                ))}
                            {categoryUid === 4 &&
                                faqList.map((faq, index) => (
                                    <FaqSub
                                        faq={faq}
                                        key={index}
                                        index={index}
                                        page={page}
                                        size={size}
                                        handleToggle={handleToggleCategory4} // 카테고리 4의 토글
                                        active={activeIndexCategory4} // 카테고리 4의 활성화 상태
                                    />
                                ))}
                        </li>
                    </ul>
                </div>
                {/* 페이지 이동 화살표 */}
                <div className="faq-paging">
                    <ul className="faq-ul">
                        <li>&lt;</li>
                        <li
                            style={{
                                color: "#1a1a1a",
                                fontWeight: "700",
                                cursor: "pointer",
                            }}
                        >
                            1
                        </li>
                        <li>&gt;</li>
                    </ul>
                </div>
                {/* 찾기 메뉴*/}
                <form>
                    <div className="faq-board_search">
                        <fieldset>
                            <select id="faq-search_date">
                                <option value={"week"}>일주일</option>
                                <option value={"month"}>한달</option>
                                <option value={"month3"}>세달</option>
                                <option value={"all"}>전체</option>
                            </select>

                            <select id="faq-search_key">
                                <option value={"subject"}>제목</option>
                                <option value={"content"}>내용</option>
                                <option value={"writer_name"}>글쓴이</option>
                                <option value={"member_id"}>아이디</option>
                                <option value={"nick_name"}>별명</option>
                            </select>
                            <input id="faq-search" />
                            <span id="faq-btn">찾기</span>
                        </fieldset>
                    </div>
                </form>
            </Main>
            <Footer />
        </>
    );
}