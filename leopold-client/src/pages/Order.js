import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import MyPageNav from "../components/MyPageNav";
import OrderTable from "../components/OrderTable";
import WhiteHeader from "../components/WhiteHeader";
import "./Order.css";

export default function Order() {
  const [sort, setSort] = useState(4);
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/order/list`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const printOrderTable = orderList.map((order, index) => (
    <OrderTable orderInfo={order} key={index} />
  ));

  return (
    <div className="Order">
      <WhiteHeader />
      <Main>
        <p className="order-title">주문 내역 조회</p>
        <div className="order">
          <MyPageNav />

          <div className="order-main">
            <div className="order-sort-wrapper">
              <div
                className={sort === 1 ? "order-sort-box-y" : "order-sort-box-n"}
                onClick={() => {
                  setSort(1);
                }}
              >
                <p>오늘</p>
              </div>

              <div
                className={sort === 2 ? "order-sort-box-y" : "order-sort-box-n"}
                onClick={() => {
                  setSort(2);
                }}
              >
                <p>1주일</p>
              </div>

              <div
                className={sort === 3 ? "order-sort-box-y" : "order-sort-box-n"}
                onClick={() => {
                  setSort(3);
                }}
              >
                <p>1개월</p>
              </div>

              <div
                className={sort === 4 ? "order-sort-box-y" : "order-sort-box-n"}
                onClick={() => {
                  setSort(4);
                }}
              >
                <p>3개월</p>
              </div>

              <div
                className={sort === 5 ? "order-sort-box-y" : "order-sort-box-n"}
                onClick={() => {
                  setSort(5);
                }}
              >
                <p>6개월</p>
              </div>

              <div
                className={sort === 6 ? "order-sort-box-y" : "order-sort-box-n"}
                onClick={() => {
                  setSort(6);
                }}
              >
                <p>전체</p>
              </div>
            </div>

            <div className="order-intro">
              <p>
                기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시
                주문처리완료 후 36개월 이내의 주문내역을 조회하실 수 있습니다.
              </p>
              <p>
                완료 후 36개월 이상 경과한 주문은 [과거주문내역]에서 확인할 수
                있습니다.
              </p>
              <p>취소/교환/반품 신청은 배송완료일 기준 7일까지 가능합니다.</p>
            </div>

            <div className="order-info-title">주문 상품 정보</div>

            <div className="order-recent-title">
              <div
                className="order-recent-title-box"
                style={{ width: "135px" }}
              >
                주문번호
              </div>

              <div
                className="order-recent-title-box"
                style={{ width: "517px" }}
              >
                상품정보
              </div>

              <div className="order-recent-title-box" style={{ width: "70px" }}>
                수량
              </div>

              <div
                className="order-recent-title-box"
                style={{ width: "120px" }}
              >
                주문금액
              </div>

              <div
                className="order-recent-title-box"
                style={{ width: "120px" }}
              >
                주문상태
              </div>

              <div
                className="order-recent-title-box"
                style={{ width: "141px" }}
              >
                취소/교환/반품
              </div>
            </div>

            {printOrderTable}
          </div>
        </div>
      </Main>
      <Footer />
    </div>
  );
}
