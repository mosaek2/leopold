import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CompleteWishTable from "../components/CompleteWishTable";
import PaymentHeader from "../components/PaymentHeader";
import "./Complete.css";

export default function Complete() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderUid = parseInt(searchParams.get("orderUid"));

    const [order, setOrder] = useState({});
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/order?orderUid=${orderUid}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setOrder(response.data.order);
                setWishList(response.data.wishList);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const date = new Date(order?.date);
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1)?.padStart(2, '0');
    const day = String(date?.getDate())?.padStart(2, '0');
    const orderNum = String(order?.uid).padStart(8, '0');

    const printWishList = wishList.map((wish, index) => (
        <CompleteWishTable wish={wish} key={index} />
    ))

    return (
        <div className="complete">
            <PaymentHeader />

            <div className="background">
                <div className="summary1">
                    <img src="\images\Payment\image 2.png" className="img2" />
                    <p className="comment1">고객님의 주문이<br />정상적으로 완료되었습니다.</p>
                    <div className="summaryLine">
                        <p style={{ color: "#686868" }}>주문 번호</p>
                        <p>{year}{month}{day}-{orderNum}</p>
                    </div>
                    <div className="summaryLine">
                        <p style={{ color: "#686868" }}>결제 금액</p>
                        <p>{order?.finalPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
                    </div>
                </div>

                <div>
                    <div className="complete-title-box">
                        결제수단
                    </div>

                    <div className="complete-content-box" style={{ display: "flex", fontSize: 15 }}>
                        <div style={{ width: 96, height: 60, color: "#636363" }}>
                            결제수단
                        </div>
                        <div style={{ height: 60 }}>
                            무통장입금
                            <br /><br />입금자: {order?.holder}, 계좌번호: {order?.account} (레오폴드(주))
                        </div>
                    </div>
                </div>

                <div>
                    <div className="complete-title-box">
                        배송지
                    </div>

                    <div className="complete-content-box" style={{ display: "flex", fontSize: 15 }}>
                        <div style={{ width: 96, color: "#636363" }}>
                            받는 사람
                        </div>
                        <div>
                            {order?.receiver}
                        </div>
                    </div>

                    <div className="complete-content-box" style={{ display: "flex", fontSize: 15 }}>
                        <div style={{ width: 96, color: "#636363" }}>
                            주소
                        </div>
                        <div>
                            {order?.address} {order?.addressDetail}
                        </div>
                    </div>

                    <div className="complete-content-box" style={{ display: "flex", fontSize: 15 }}>
                        <div style={{ width: 96, color: "#636363" }}>
                            연락처
                        </div>
                        <div>
                            {order?.phone}
                        </div>
                    </div>

                    <div className="complete-content-box" style={{ display: "flex", fontSize: 15 }}>
                        <div style={{ width: 96, height: 60, color: "#636363" }}>
                            배송요청
                        </div>
                        <div style={{ height: 60 }}>
                            {order?.receiveMethod}
                            <br /><br />{order?.message === "default" ? undefined : order?.message}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="complete-title-box">
                        주문 상품
                    </div>

                    <div className="complete-content-box">
                        {printWishList}
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: 30, padding: "28px 35px", marginBottom: 100 }}>
                <button className="complete-btn-1"
                    onClick={() => { navigate(`/order/detail?orderUid=${order?.uid}`) }}>주문확인하기</button>
                <button className="complete-btn-2"
                    onClick={() => { navigate(`/shopping`) }}>쇼핑계속하기</button>
            </div>
        </div>
    )
}