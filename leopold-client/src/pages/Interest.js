import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import InterestTable from "../components/InterestTable";
import Main from "../components/Main";
import MyPageNav from "../components/MyPageNav";
import WhiteHeader from "../components/WhiteHeader";
import { ContextSystem } from "../functions/MyContext";
import "./Interest.css";

export default function Interest() {
  const navigate = useNavigate();
  const { get, set } = useContext(ContextSystem);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  const [interestList, setInterestList] = useState([]);
  const [totalElements, setTotalElements] = useState();

  const [selectedUidList, setSelectedUidList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/interest?page=${page}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setInterestList(response.data.list);
        setTotalElements(response.data.totalElements);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status === 401) {
          alert(error.response.data);
          localStorage.setItem("isLogin", "false");
          set.isLogin(false);
          navigate("/login");
        }
      });
  }, [page]);

  const printInterestList = interestList?.map((interest, index) => (
    <InterestTable
      interest={interest}
      key={index}
      selectedUidList={selectedUidList}
      setSelectedUidList={setSelectedUidList}
    />
  ));

  function handleClickDeleteSelected() {
    selectedUidList?.map((selectedUid) => {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/interest?interestUid=${selectedUid}`,
          { withCredentials: true },
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    });

    alert("상품이 삭제되었습니다.");
    navigate(0);
  }

  function handleClickDeleteAll() {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/interest/all`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        alert("관심 상품 목록을 비웠습니다.");
        navigate(0);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function handlePageChange(page) {
    navigate(`/interest?page=${page}`);
    window.scrollTo(0, 0);
  }

  return (
    <div className="Interest">
      <WhiteHeader />
      <Main>
        <p className="interest-title">관심 상품</p>
        <div className="interest">
          <MyPageNav />

          <div className="interest-main">
            <div className="interest-small-title">관심 상품 목록</div>

            <div className="interest-th">
              <div className="interest-th-box" style={{ width: 77 }}></div>
              <div className="interest-th-box" style={{ width: 711 }}>
                상품정보
              </div>
              <div className="interest-th-box" style={{ width: 120 }}>
                판매가
              </div>
              <div className="interest-th-box" style={{ width: 195 }}>
                선택
              </div>
            </div>

            {printInterestList}

            <div className="interest-function-container">
              <button onClick={handleClickDeleteSelected}>
                선택상품을 삭제
              </button>
              <button onClick={handleClickDeleteAll} style={{ marginLeft: 10 }}>
                관심상품 목록 비우기
              </button>
            </div>

            <div className="pagination-wrapper">
              <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalElements} //전체 아이템 수
                pageRangeDisplayed={5} //페이지네이션에 표시할 페이지 범위
                onChange={handlePageChange} //페이지 변경 시 호출되는 함수
                itemClass="page-item" //각 페이지 아이템에 적용할 클래스명
                linkClass="page-link" //각 페이지 링크에 적용할 클래스명
              />
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </div>
  );
}
