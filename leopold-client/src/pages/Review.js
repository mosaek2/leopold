import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import ReviewTable from "../components/ReviewTable";
import WhiteHeader from "../components/WhiteHeader";
import "./Review.css";

export default function Review() {
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 6;
  const [reviewList, setReviewList] = useState([]);
  const [totalElements, setTotalElements] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/reviews?page=${page}&size=${size}`,
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        setReviewList(res.data);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err.res.data));
  }, [page, size]);

  const printReviewList = reviewList["list"]?.map((list, index) => (
    <ReviewTable list={list} key={index} />
  ));

  function handlePageChange(pageNum) {
    navigate(`/review?page=${pageNum}&size=6`);
  }

  return (
    <div className="Review">
      <WhiteHeader />
      <Main>
        {/* 메뉴 바 */}
        <div className="review-comm_title">
          <ul className="review-tab">
            <li className="review-on">
              <Link to="/notices">
                <div className="review-img">
                  <img src="\images\Download\cs_notice.svg" alt="확성기" />
                </div>
                <br />
                <div className="review-txt">공지사항</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/downloads">
                <div className="review-img">
                  <img src="\images\Notice\cs_download.svg" alt="구름" />
                </div>
                <br />
                <div className="review-txt">자료실</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/faq">
                <div className="review-img">
                  <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                </div>
                <br />
                <div className="review-txt">FAQ</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/as">
                <div className="review-img">
                  <img src="\images\Notice\cs_as.svg" alt="스패너" />
                </div>
                <br />
                <div className="review-txt">A/S 접수</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/review">
                <div className="review-img">
                  <img src="\images\Review\cs_review_on.svg" alt="말풍선" />
                </div>
                <br />
                <div className="review-txt">사용자 리뷰</div>
              </Link>
            </li>
          </ul>
        </div>
        {/* 제목 */}
        <div className="review-titleArea">
          <h2>사용자 리뷰</h2>
          <p>User review</p>
        </div>
        <div className="review-base-table">
          {/* 리뷰 게시판 카테고리 */}
          <table>
            <colgroup className="review-board">
              <col style={{ width: "80px" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "120px" }} />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            {/* 리뷰 게시판 공지 */}
            <tbody className="review-board-notice">
              <tr>
                <td>
                  <img
                    src="\images\Review\edb64352918b2053a1637b66ac073850.png"
                    alt="공지"
                  />
                </td>
                <td className="review-subject">
                  <strong>
                    <Link to={"/review/notice"}>{"사용자 리뷰 안내"}</Link>
                  </strong>
                </td>
                <td>
                  <img src="\images\Notice\ico_nick1.gif" />
                  {"Leopold"}
                </td>
                <td>
                  <span className="review-txtNum">{"2023-8-29"}</span>
                </td>
              </tr>
            </tbody>
            {/* 리뷰 게시판 내용 */}
            {printReviewList}
          </table>
        </div>
        {/* 글쓰기 버튼 */}
        <div className="review-btn">
          <span className="review-gRight">
            <Link to="/review/write" className="review-btnSubmit">
              글쓰기
            </Link>
          </span>
        </div>
        {/* 페이지 이동 화살표 */}
        <Pagination
          activePage={page} // 현재 활성화된 페이지
          itemsCountPerPage={size} // 페이지당 아이템 수
          totalItemsCount={totalElements} // 전체 아이템 수
          pageRangeDisplayed={5} // 페이지네이션에 표시할 페이지 범위
          onChange={handlePageChange} // 페이지 변경 시 호출되는 함수
          itemClass="page-item" // 각 페이지 아이템에 적용할 클래스명
          linkClass="page-link" // 각 페이지 링크에 적용할 클래스명
        />
        {/* 찾기 메뉴*/}
        <form>
          <div className="review-board_search">
            <fieldset>
              <select id="review-search_date">
                <option value={"week"}>일주일</option>
                <option value={"month"}>한달</option>
                <option value={"month3"}>세달</option>
                <option value={"all"}>전체</option>
              </select>

              <select id="review-search_key">
                <option value={"subject"}>제목</option>
                <option value={"content"}>내용</option>
                <option value={"writer_name"}>글쓴이</option>
                <option value={"member_id"}>아이디</option>
                <option value={"nick_name"}>별명</option>
              </select>
              <input id="review-search" />
              <span id="review-btn">찾기</span>
            </fieldset>
          </div>
        </form>
      </Main>
      <Footer />
    </div>
  );
}
