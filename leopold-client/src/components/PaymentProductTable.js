import "./PaymentProductTable.css";

export default function PaymentProductTable({ wish }) {
  return (
    <div className="PaymentProductTable">
      <div className="ppt-product-container">
        <div className="ppt-product-cover-wrapper">
          <img
            src={wish?.cart?.product?.coverUrl}
            alt="cover"
            width={90}
            height={90}
          />
        </div>

        <div className="ppt-product-info-wrapper">
          <p className="ppt-product-info-font1">
            {wish?.cart?.product?.productCategory?.name}{" "}
            {wish?.cart?.product?.color}
          </p>
          <p className="ppt-product-info-font2">
            [옵션: {wish?.cart?.product?.engraving}/
            {wish?.cart?.product?.switchValue}]
          </p>
          <p className="ppt-product-info-font2">
            수량: {wish?.cart?.quantity}개
          </p>
          <p className="ppt-product-info-font3">
            {(
              wish?.cart?.quantity *
              wish?.cart?.product?.price *
              (1 - wish?.cart?.product?.discountRate)
            )
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원
          </p>
        </div>
      </div>
    </div>
  );
}
