import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DownloadTable from "../components/DownloadTable";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./Download.css";

export default function Download() {
    const [downloadList, setDownloadList] = useState([]);
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
    const categoryUid = queryParams.get("category") ? parseInt(queryParams.get("category")) : 0;

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/downloads?page=${page}&size=${size}&category=${categoryUid}`
            )
            .then((res) => {
                console.log(res.data);
                setDownloadList(res.data);
            })
            .catch((err) => console.log(err.res.data));
    }, [page, size, categoryUid]);

    function handleChangeSort(e) {
        navigate(`/downloads?page=1&size=10&category=${e.target.value}`);
    }

    function handlePageChange(pageNum) {
        navigate(`/downloads?page=${pageNum}&size=10&category=${categoryUid}`);
    }

    return (
        <div className="Download">
            <WhiteHeader />
            <Main>
                <div className="download-comm_title">
                    {/* 메뉴 바 */}
                    <ul className="download-tab">
                        <li className="download-on">
                            <Link to="/notices">
                                <div className="download-img">
                                    <img src="\images\Download\cs_notice.svg" alt="확성기" />
                                </div>
                                <br />
                                <div className="download-txt">공지사항</div>
                            </Link>
                        </li>
                        <li className="download-on">
                            <Link to="/downloads">
                                <div className="download-img">
                                    <img src="\images\Download\cs_data_on.svg" alt="구름" />
                                </div>
                                <br />
                                <div className="download-txt">자료실</div>
                            </Link>
                        </li>
                        <li className="download-on">
                            <Link to="/faq">
                                <div className="download-img">
                                    <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                                </div>
                                <br />
                                <div className="download-txt">FAQ</div>
                            </Link>
                        </li>
                        <li className="download-on">
                            <Link to="/as">
                                <div className="download-img">
                                    <img src="\images\Notice\cs_as.svg" alt="스패너" />
                                </div>
                                <br />
                                <div className="download-txt">A/S 접수</div>
                            </Link>
                        </li>
                        <li className="download-on">
                            <Link to="/review">
                                <div className="download-img">
                                    <img src="\images\Notice\cs_review.svg" alt="말풍선" />
                                </div>
                                <br />
                                <div className="download-txt">사용자 리뷰</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* 제목 */}
                <div className="download-titleArea">
                    <h2>자료실</h2>
                    <p>Download</p>
                </div>
                {/* 카테고리 바 */}
                <div className="download-boardSort">
                    <select
                        id="download-board_category"
                        name="board_category"
                        onChange={handleChangeSort}
                    >
                        <option value={0}>전체</option>
                        <option value={1}>소프트웨어</option>
                        <option value={2}>매뉴얼</option>
                        <option value={3}>문제해결</option>
                    </select>
                </div>

                <div className="download-base-table">
                    <table className="download-thead">
                        {/* 자료실 게시판 목록 */}
                        <colgroup className="notice-board">
                            <col style={{ width: "80px" }} />
                            <col style={{ width: "135px" }} />
                            <col style={{ width: "auto" }} />
                            <col style={{ width: "120px" }} />
                            <col style={{ width: "120px" }} />
                        </colgroup>
                        <thead>
                            <tr className="download-theadTitle">
                                <th className="download-theadTitle">번호</th>
                                <th className="download-theadTitle">카테고리</th>
                                <th className="download-theadTitle">제목</th>
                                <th className="download-theadTitle">작성자</th>
                                <th className="download-theadTitle">작성일</th>
                            </tr>
                        </thead>
                        {/* 자료실 게시판 목록 내용 */}
                        {downloadList.map((list, index) => (
                            <DownloadTable
                                list={list}
                                key={index}
                                index={index}
                                page={page}
                                size={size}
                            />
                        ))}
                    </table>
                </div>
                {/* 페이지 이동 화살표 */}
                <Pagination
                    activePage={page} // 현재 활성화된 페이지
                    itemsCountPerPage={size} // 페이지당 아이템 수
                    totalItemsCount={downloadList[0]?.totalElements} // 전체 아이템 수
                    pageRangeDisplayed={10} // 페이지네이션에 표시할 페이지 범위
                    onChange={handlePageChange} // 페이지 변경 시 호출되는 함수
                    itemClass="page-item" // 각 페이지 아이템에 적용할 클래스명
                    linkClass="page-link" // 각 페이지 링크에 적용할 클래스명
                />
                {/* <div className="download-paging">
          <ul className="download-ul">
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
        </div> */}
                {/* 찾기 메뉴*/}
                <form>
                    <div className="download-board_search">
                        <fieldset>
                            <select id="download-search_date">
                                <option value={"week"}>일주일</option>
                                <option value={"month"}>한달</option>
                                <option value={"month3"}>세달</option>
                                <option value={"all"}>전체</option>
                            </select>

                            <select id="download-search_key">
                                <option value={"subject"}>제목</option>
                                <option value={"content"}>내용</option>
                                <option value={"writer_name"}>글쓴이</option>
                                <option value={"member_id"}>아이디</option>
                                <option value={"nick_name"}>별명</option>
                            </select>
                            <input id="download-search" />
                            <span id="download-btn">찾기</span>
                        </fieldset>
                    </div>
                </form>
            </Main>
            <Footer />
        </div>
    );
}