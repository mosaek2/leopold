import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import ShoppingDetailTable from "../components/ShoppingDetailTable";
import WhiteHeader from "../components/WhiteHeader";
import { ContextSystem } from "../functions/MyContext";
import "./ShoppingDetail.css";

export default function ShoppingDetail() {
  const navigate = useNavigate();
  const { get } = useContext(ContextSystem);
  const [searchParams] = useSearchParams();
  const uid = parseInt(searchParams.get("uid"));

  const [category2, setCategory2] = useState("default");
  const [category3, setCategory3] = useState("default");
  const [category4, setCategory4] = useState("default");
  const [category5, setCategory5] = useState("default");

  const [preview, setPreview] = useState([]);

  const [detailCategory, setDetailCategory] = useState(1);

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shopping/detail?uid=${uid}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setCategory2(response.data.productCategory);
        setCategory3(response.data.color);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [uid]);

  const category4List = ["한글", "영문"];
  const printCategory4List = category4List?.map((list, index) => (
    <option key={index}>{list}</option>
  ));

  const category5List = [
    "갈축",
    "청축",
    "적축",
    "흑축",
    "저소음 적축",
    "백축",
    "은축",
  ];
  const printCategory5List = category5List?.map((list, index) => {
    if (list === "저소음 적축" || list === "백축" || list === "은축") {
      return (
        <option key={index} value={list}>
          {list} (+2,500원)
        </option>
      );
    }

    return (
      <option key={index} value={list}>
        {list}
      </option>
    );
  });

  function handleChangeCategory4(e) {
    setCategory4(e.target.value);
  }

  function handleChangeCategory5(e) {
    setCategory5(e.target.value);

    if (category4 === "default") {
      alert("각인을 먼저 선택해 주세요.");
      setCategory5("default");
      return;
    }

    if (
      preview.some(
        (obj) =>
          obj.category4 === category4 && obj.category5 === e.target.value,
      )
    ) {
      alert("동일한 상품이 목록에 존재합니다.");
      setCategory4("default");
      setCategory5("default");
      return;
    }

    let price = product?.price * (1 - product?.discountRate);
    if (
      e.target.value === "저소음 적축" ||
      e.target.value === "백축" ||
      e.target.value === "은축"
    ) {
      price += 2500;
    }

    const previewTable = {
      category2: category2,
      category3: category3,
      category4: category4,
      category5: e.target.value,
      quantity: 1,
      price: price,
    };

    console.log(previewTable);
    setPreview([...preview, previewTable]);
  }

  function handleClickCart() {
    console.log(preview);

    if (get.isLogin === false) {
      alert("로그인 후 이용해 주세요.");
      navigate(`/login`);
      return;
    }

    if (preview.length === 0) {
      alert("상품을 선택해 주세요.");
      return;
    }

    for (let i = 0; i < preview.length; i++) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/cart`,
          {
            category2: `${preview[i].category2}`,
            category3: `${preview[i].category3}`,
            category4: `${preview[i].category4}`,
            category5: `${preview[i].category5}`,
            quantity: `${preview[i].quantity}`,
          },
          { withCredentials: true },
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    let confirm = window.confirm(
      "성공적으로 등록되었습니다. 장바구니로 이동하시겠습니까?",
    );
    if (confirm) {
      navigate("/cart");
    } else {
      navigate(-1);
    }
  }

  function handleClickInterest() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/interest?productUid=${uid}`,
        {},
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);
        alert("상품을 관심상품으로 추가했습니다.");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function handleClickBuy() {
    alert("상품을 장바구니에 담아주세요");
  }

  return (
    <div className="sd">
      <WhiteHeader />
      <Main>
        <div
          style={{
            margin: "208px auto 0px auto",
            display: "flex",
            gap: 80,
            width: 1280,
          }}
        >
          <div className="sd-section1">
            <img
              src={product?.coverUrl}
              alt="cover"
              style={{ borderRadius: 30 }}
              width={638}
              height={638}
            />
          </div>
          <div className="sd-section2">
            <p style={{ fontSize: 24, fontWeight: "bold" }}>
              {product?.productCategory} {product?.color}
            </p>

            <div
              style={{
                display: "flex",
                fontSize: 24,
                marginTop: 32,
                alignItems: "center",
              }}
            >
              <p style={{ color: "#ff9924", fontWeight: "bold" }}>
                {(product?.price * (1 - product?.discountRate))
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
              <p style={{ color: "#ff9924", fontWeight: "bold" }}>원</p>
              {product?.discountRate !== 0.0 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p
                    style={{
                      fontSize: 20,
                      color: "#c6c6c6",
                      textDecoration: "line-through",
                      marginLeft: 20,
                    }}
                  >
                    {product?.price
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                  <p style={{ fontSize: 20, color: "#ff5a5a", marginLeft: 10 }}>
                    {product?.discountRate * 100}
                  </p>
                  <p style={{ fontSize: 20, color: "#ff5a5a" }}>%</p>
                </div>
              ) : undefined}
            </div>

            <div className="sd-deliver-info">
              <div className="sd-deliver-key">
                <p>배송방법</p>
                <p>배송비</p>
              </div>
              <div className="sd-deliver-value">
                <p>택배 or 퀵서비스</p>
                <p>3,000원</p>
              </div>
            </div>

            <div className="sd-category-box">
              <p>각인</p>

              <select
                value={category4}
                onChange={handleChangeCategory4}
                onClick={() => {
                  setCategory5("default");
                }}
              >
                <option value="default">[필수] 옵션을 선택해 주세요</option>
                {printCategory4List}
              </select>
            </div>

            <div className="sd-category-box">
              <p>스위치</p>

              <select value={category5} onChange={handleChangeCategory5}>
                <option value="default">[필수] 옵션을 선택해 주세요</option>
                {printCategory5List}
              </select>
            </div>

            <p className="sd-info-text1">(최소주문수량 1개 이상)</p>

            <p className="sd-info-text2">
              위 옵션선택 박스를 선택하시면 아래에 상품이 추가됩니다.
            </p>

            <ShoppingDetailTable preview={preview} setPreview={setPreview} />

            <div
              style={{ display: "flex", alignItems: "baseline", marginTop: 30 }}
            >
              <p style={{ fontSize: 13 }}>총 상품금액:&nbsp;</p>

              <p style={{ fontSize: 20, fontWeight: "bold" }}>
                {preview
                  ?.reduce((sum, pt) => sum + pt.price, 0)
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </p>
            </div>

            <div style={{ display: "flex", gap: 17, marginTop: 32 }}>
              <button
                className="sd-interest-btn sd-custom-btn1"
                onClick={handleClickInterest}
              >
                <img src="\images\Shopping\interest.png" alt="interest" />
              </button>

              <button
                className="sd-cart-btn sd-custom-btn1"
                onClick={handleClickCart}
              >
                선택한 상품을 장바구니에 담기
              </button>
            </div>
          </div>
        </div>

        <div className="sd-detail-category-container">
          <div
            className={
              detailCategory === 1
                ? "sd-detail-category-box-select"
                : "sd-detail-category-box-not-select"
            }
            onClick={() => {
              setDetailCategory(1);
            }}
          >
            구매 전 필독사항
          </div>

          <div
            className={
              detailCategory === 2
                ? "sd-detail-category-box-select"
                : "sd-detail-category-box-not-select"
            }
            onClick={() => setDetailCategory(2)}
          >
            상품 상세정보
          </div>

          <div
            className={
              detailCategory === 3
                ? "sd-detail-category-box-select"
                : "sd-detail-category-box-not-select"
            }
            onClick={() => {
              setDetailCategory(3);
            }}
          >
            상품 문의
          </div>

          <div
            className={
              detailCategory === 4
                ? "sd-detail-category-box-select"
                : "sd-detail-category-box-not-select"
            }
            onClick={() => {
              setDetailCategory(4);
            }}
          >
            구매 안내
          </div>
        </div>

        {detailCategory === 1 ? (
          <img
            src="\images\Shopping\temp_intro.jpg"
            width={900}
            alt="intro"
            style={{ margin: "150px auto 0px auto", display: "block" }}
          />
        ) : undefined}

        {detailCategory === 2 ? (
          <img
            src={product?.detailUrl}
            width={900}
            alt="detail"
            style={{ margin: "150px auto 0px auto", display: "block" }}
          />
        ) : undefined}

        {detailCategory === 3 ? (
          <div className="sd-lower-section">
            <p
              style={{
                fontSize: 24,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              상품문의
            </p>
          </div>
        ) : undefined}

        {detailCategory === 4 ? (
          <div className="sd-lower-section">
            <table style={{ borderTop: "1px solid #ededed" }}>
              <tr>
                <td className="sd-intro-table-left">
                  <p>상품결제정보</p>
                </td>
                <td className="sd-intro-table-right">
                  <p>
                    [무통장입금 계좌 정보]
                    <br />
                    국민은행 477401-01-100878 예금주 : 레오폴드(주)
                    <br />
                    <br />- 무통장입금의 경우 반드시 주문시 입력한 입금자명과
                    실제 입금자의 성명이 동일해야 합니다.
                    <br />
                    입금자 성명이 다른 경우 입금확인이 불가합니다.
                    <br />- 주문 후 24시간 이내로 입금 및 결제되지 않은 주문건은
                    자동 취소 됩니다.
                  </p>
                </td>
              </tr>

              <tr>
                <td className="sd-intro-table-left">
                  <p>배송정보</p>
                </td>
                <td className="sd-intro-table-right">
                  <br />
                  배송 방법 : 고객직접선택
                  <br />
                  배송 지역 : 전국지역
                  <br />
                  배송 비용 : 고객직접선택
                  <br />
                  배송 기간 : 1일 ~ 3일
                  <br />
                  배송 안내 : 오후 2시 이전 결제 완료 건에 한하여 당일 발송
                  되며, 그 이후 주문건은 영업일 기준 익일 발송됩니다.
                  <br />
                  <br />
                  퀵서비스 및 방문수령을 원하시는 고객님께서는 배송방법을
                  퀵서비스로 설정하여 주문하신 후, 고객센터로 연락 부탁드립니다.
                  <br />
                  (퀵서비스 : 고양시에서 출발하는 퀵서비스로 수도권 지역에
                  한하여 착불로 발송 가능하며, 지역별 배송비가 차등 적용됩니다.)
                </td>
              </tr>

              <tr>
                <td className="sd-intro-table-left">
                  <p>교환 및 반품정보</p>
                </td>
                <td className="sd-intro-table-right">
                  교환 및 반품 주소
                  <br />- 경기도 고양시 일산동구 하늘마을로 158, 대방트리플라온
                  B동 306호
                  <br />
                  <br /> 교환 및 반품이 가능한 경우
                  <br />- 제품에 이상이 있는 경우 수령일로부터 7일 이내 반품 및
                  환불이 가능합니다.
                  <br />- 공급받으신 상품이 표시, 광고 내용과 다른 경우
                  수령일로부터 7일 이내 반품 및 환불이 가능합니다.
                  <br />
                  <br />
                  <br />
                  교환 및 반품이 불가능한 경우
                  <br />- 제품 수령 후 소비자의 과실로 상품이 멸실 또는 훼손된
                  경우
                  <br />- 제품 박스에 부착된 봉인 스티커를 제거 후 박스를 개봉한
                  경우
                  <br />- 제품의 이상 유무를 확인하는 개봉 과정은 상관없으나,
                  개봉 후 이상이 없음에도 단순 변심으로 반품을 요청하는 경우
                  <br />- 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의
                  가치가 현저히 감소한 경우
                  <br />- 복제가 가능한 재화등의 포장을 훼손한 경우
                  <br />- 불량이 아닌 제품을 개봉 후 설치 또는 사용하여 상품의
                  가치가 상실된 경우
                  <br />
                  <br />
                  <br />※ 고객님의 마음이 바뀌어 단순 변심으로 교환 또는 반품을
                  하실 경우 왕복 배송 비용은 고객님께서 부담하셔야 합니다.
                  <br />
                  (색상 교환, 사이즈 교환 등 포함)
                </td>
              </tr>
            </table>
          </div>
        ) : undefined}
      </Main>
      <Footer />
    </div>
  );
}
