import "./OrderDetailTable.css";

export default function OrderDetailTable({ wish }) {
    return (
        <div className="OrderDetailTable">
            <div className="odt-cover-box">
                <img src={wish?.coverUrl} alt="cover" className="odt-cover" />
            </div>

            <div className="odt-info-box">
                <p>{wish?.name} {wish?.color}</p>
                <p style={{ color: "#757575", fontSize: "13px" }}>[옵션: {wish?.engraving}/{wish?.switchValue}]</p>
            </div>

            <div className="odt-quantity-box">
                <p style={{ fontSize: 13 }}>{wish?.quantity}</p>
            </div>

            <div className="odt-price-box">
                <p style={{ fontSize: 16, fontWeight: "bold" }}>{(wish?.price * (1 - wish?.discountRate))
                    ?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
            </div>

            <div className="odt-price-box">
                {wish?.status !== "주문취소"
                    ? <p style={{ color: "#ff9900" }}>{wish?.status}</p>
                    : <p style={{ color: "red" }}>{wish?.status}</p>}
            </div>

            <div className="odt-other-box">
                <p>-</p>
            </div>
        </div>
    )
}