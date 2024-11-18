import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartTable.css";

export default function CartTable({ cart, selectList, setSelectList }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [newQuantity, setNewQuantity] = useState(cart?.quantity);
  let uid = cart?.uid;

  function handleClickCheckBox(e) {
    setIsChecked(e.target.checked);

    if (e.target.checked === true) {
      const newList = selectList?.map((listUid, index) => {
        if (listUid !== uid) {
          return listUid;
        }
      });
      newList.push(uid);
      setSelectList(newList);
      console.log(newList);
    } else {
      const newList = selectList?.filter((listUid) => listUid !== uid);
      setSelectList(newList);
      console.log(newList);
    }
  }

  function handleClickNewQuantity() {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/cart/quantity?uid=${uid}&quantity=${newQuantity}`,
        {},
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div className="cart-table">
      <div className="cart-table-key-container">
        <div className="cart-table-key-box" style={{ width: 52 }}>
          <input
            type="checkbox"
            style={{ width: 20, height: 20 }}
            checked={isChecked}
            onChange={handleClickCheckBox}
          />
        </div>

        <div className="cart-table-key-box" style={{ width: 169 }}>
          <img
            src={cart?.coverUrl}
            alt="cover"
            style={{ width: 120, height: 120, borderRadius: 12 }}
          />
        </div>

        <div
          className="cart-table-key-box"
          style={{ width: 379, alignItems: "start", paddingLeft: 10 }}
        >
          <p>
            {cart?.name} {cart?.color}
          </p>
          <p>
            [옵션: {cart?.engraving}/{cart?.switchValue}]
          </p>
        </div>

        <div className="cart-table-key-box" style={{ width: 128 }}>
          <input
            type="number"
            defaultValue={cart?.quantity}
            style={{
              width: 92,
              height: 26,
              textAlign: "center",
              border: "1px solid #e9e9e9",
            }}
            onChange={(e) => {
              setNewQuantity(e.target.value);
            }}
            min={1}
          />
          <button
            className="cart-table-small-btn"
            style={{ width: 92, height: 26 }}
            onClick={handleClickNewQuantity}
          >
            수량변경
          </button>
        </div>

        <div className="cart-table-key-box" style={{ width: 110 }}>
          <p style={{ fontWeight: "bold" }}>
            {(cart?.price * cart?.quantity)
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
        </div>

        {cart?.discountRate === 0 ? (
          <div className="cart-table-key-box" style={{ width: 88 }}>
            -
          </div>
        ) : (
          <div
            className="cart-table-key-box"
            style={{ width: 88, color: "#ff5a5a" }}
          >
            -
            {(cart?.price * cart?.discountRate * cart?.quantity)
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </div>
        )}

        <div className="cart-table-key-box" style={{ width: 88 }}>
          -
        </div>

        <div className="cart-table-key-box" style={{ width: 85 }}>
          기본배송
        </div>

        <div className="cart-table-key-box" style={{ width: 98 }}>
          선택
        </div>

        <div className="cart-table-key-box" style={{ width: 152 }}>
          <button
            className="cart-table-small-btn"
            onClick={() => {
              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/cart?uid=${cart?.uid}`,
                  { withCredentials: true },
                )
                .then((response) => {
                  console.log(response.data);
                  alert("상품이 장바구니에서 삭제되었습니다.");
                  navigate(0);
                })
                .catch((error) => {
                  console.log(error.response.data);
                });
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
