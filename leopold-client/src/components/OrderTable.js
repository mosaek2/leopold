import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./OrderTable.css";
import OrderTableCart from "./OrderTableCart";

export default function OrderTable({ orderInfo }) {
  const navigate = useNavigate();
  const list = orderInfo?.wishList;
  const order = orderInfo?.order;

  const date = new Date(order?.date);
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, "0");
  const day = String(date?.getDate())?.padStart(2, "0");
  const orderNum = String(order?.uid).padStart(8, "0");

  const printOrderTableCart = list?.map((wish, index) => (
    <OrderTableCart wish={wish} key={index} />
  ));

  return (
    <div className="OrderTable">
      <div className="ot-num">
        <p className="ot-date">
          {year}-{month}-{day}
        </p>
        <p className="ot-uid">
          {year}
          {month}
          {day}-{orderNum}
        </p>

        <Link to={`/order/detail?orderUid=${order?.uid}`}>
          <button className="ot-num-order-view">주문상세보기</button>
        </Link>

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="ot-small-btn"
            onClick={() => {
              if (order?.status === "주문취소") {
                alert("이미 취소된 주문입니다.");
                return;
              }

              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/order?orderUid=${order?.uid}`,
                  { withCredentials: true },
                )
                .then((response) => {
                  console.log(response.data);
                  alert("주문이 취소되었습니다.");
                  navigate(0);
                })
                .catch((error) => {
                  console.log(error.response.data);
                });
            }}
          >
            주문취소
          </button>
          <button
            className="ot-small-btn"
            onClick={() => {
              alert("준비중입니다.");
            }}
          >
            교환
          </button>
        </div>
      </div>

      <div className="ot-info-wrapper">{printOrderTableCart}</div>
    </div>
  );
}
