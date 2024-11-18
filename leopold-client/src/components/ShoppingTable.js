import { useNavigate } from "react-router-dom";
import "./ShoppingTable.css";

export default function ShoppingTable({ product }) {
  const navigate = useNavigate();

  function handleClickCover() {
    navigate(`/shopping/detail?uid=${product?.uid}`);
  }

  return (
    <div className="ShoppingTable">
      <img
        src={product?.coverUrl}
        alt="cover"
        className="st-cover"
        onClick={handleClickCover}
      />
      <p style={{ marginTop: 22 }}>
        {product?.productCategory} {product?.color}
      </p>

      <div style={{ display: "flex", marginTop: 28, alignItems: "baseline" }}>
        <p style={{ fontSize: 24, fontWeight: "bold" }}>
          {(product?.price * (1 - product?.discountRate))
            ?.toString()
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p>원</p>
      </div>

      {product?.discountRate !== 0.0 ? (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <p style={{ color: "#ff5a5a" }}>{product?.discountRate * 100}%</p>
          <p style={{ color: "#b2b2b2", textDecoration: "line-through" }}>
            {product?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
        </div>
      ) : undefined}
    </div>
  );
}
