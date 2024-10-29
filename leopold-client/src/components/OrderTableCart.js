import "./OrderTableCart.css";

export default function OrderTableCart({ wish }) {
    return (
        <div className="otc">
            <div className="ot-cover-box">
                <img className="ot-cover" src={wish?.coverUrl} alt="cover" />
            </div>

            <div className="ot-info">
                <p className="ot-info-1">{wish?.name} {wish?.color}</p>
                <p className="ot-info-2">[옵션: {wish?.engraving}/{wish?.switchValue}]</p>
            </div>

            <div className="ot-quantity">
                {wish?.quantity}
            </div>

            <div className="ot-price">
                {(wish?.quantity * wish?.price * (1 - wish?.discountRate))?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </div>

            {wish?.status !== "주문취소"
                ?
                <div className="ot-order-status">
                    {wish?.status}
                </div>
                :
                <div className="ot-order-status" style={{ color: "red" }}>
                    {wish?.status}
                </div>
            }

            <div className="ot-others">
                -
            </div>
        </div>
    )
}