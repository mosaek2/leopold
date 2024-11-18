import "./CompleteWishTable.css";

export default function CompleteWishTable({ wish }) {
  return (
    <div className="CompleteWishTable">
      <img className="cwt-cover" src={wish?.coverUrl} />

      <div className="cwt-info">
        <p style={{ fontWeight: "bold", fontSize: 16 }}>
          {wish?.name} {wish?.color}
        </p>

        <p>
          [옵션: {wish?.graving}/{wish?.switchValue}]
        </p>

        <p>수량: {wish?.quantity}개</p>

        <p>
          상품구매금액:{" "}
          {(wish?.price * (1 - wish?.discountRate))
            ?.toString()
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </p>
      </div>
    </div>
  );
}
