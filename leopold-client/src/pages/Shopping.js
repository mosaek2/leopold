import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import ShoppingTable from "../components/ShoppingTable";
import WhiteHeader from "../components/WhiteHeader";
import "./Shopping.css";

export default function Shopping() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")
    ? parseInt(searchParams.get("category"))
    : 1;
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "new";

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/shopping?category=${category}&page=${page}&sort=${sort}`,
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [category, page, sort]);

  const categoryList1 = [
    "FC900RBT MX2A",
    "FC900RBT",
    "NP900RBT",
    "FC750RBT MX2A",
    "FC750RBT",
    "NP750RBT",
    "FC730RBT MX2A",
    "FC630MBT MX2A",
    "FC660MBT",
    "FC980MBT",
    "FC650MDSBT",
  ];
  const categoryList2 = [
    "FC900R MX2A",
    "FC900R",
    "FC750R",
    "FC980M",
    "FC660M",
    "FC650MDS",
    "FC210TP",
  ];
  const categoryList3 = ["FC980C"];

  const printCategoryList1 = categoryList1?.map((ct, index) => {
    return (
      <div
        className={
          category === index + 7
            ? "shopping-category2-box-select"
            : "shopping-category2-box-not-select"
        }
        key={index}
        onClick={() => handleClickCategory(index + 7)}
      >
        {ct}
      </div>
    );
  });

  const printCategoryList2 = categoryList2?.map((ct, index) => (
    <div
      className={
        category === index + 18
          ? "shopping-category2-box-select"
          : "shopping-category2-box-not-select"
      }
      key={index}
      onClick={() => handleClickCategory(index + 18)}
    >
      {ct}
    </div>
  ));

  const printCategoryList3 = categoryList3?.map((ct, index) => (
    <div
      className={
        category === index + 25
          ? "shopping-category2-box-select"
          : "shopping-category2-box-not-select"
      }
      key={index}
      onClick={() => handleClickCategory(index + 25)}
    >
      {ct}
    </div>
  ));

  const printProductList = productList?.map((product, index) => (
    <ShoppingTable product={product} key={index} />
  ));

  function handleClickCategory(category) {
    navigate(`/shopping?category=${category}&page=1&sort=new`);
  }

  function handleChangeSort(e) {
    navigate(`/shopping?category=${category}&page=1&sort=${e.target.value}`);
  }

  return (
    <div className="Shopping">
      <WhiteHeader />
      <Main>
        <img
          src="\images\Shopping\temp_banner.jpg"
          alt="banner"
          className="shopping-banner"
        />

        <div className="shopping-category1-container">
          <div
            className={
              (category >= 7 && category <= 17) || category === 4
                ? "shopping-category1-select"
                : "shopping-category1-not-select"
            }
            onClick={() => handleClickCategory(4)}
          >
            기계식 유·무선 키보드
          </div>
          <div
            className={
              (category >= 18 && category <= 24) || category === 5
                ? "shopping-category1-select"
                : "shopping-category1-not-select"
            }
            onClick={() => handleClickCategory(5)}
          >
            기계식 유선 키보드
          </div>
          <div
            className={
              category >= 25 || category === 6
                ? "shopping-category1-select"
                : "shopping-category1-not-select"
            }
            onClick={() => handleClickCategory(6)}
          >
            정전용량 무접점
          </div>
        </div>

        {(category >= 7 && category <= 17) || category === 4 ? (
          <div className="shopping-category2-container">
            {printCategoryList1}
          </div>
        ) : undefined}

        {(category >= 18 && category <= 24) || category === 5 ? (
          <div className="shopping-category2-container">
            {printCategoryList2}
          </div>
        ) : undefined}

        {category >= 25 || category === 6 ? (
          <div className="shopping-category2-container">
            {printCategoryList3}
          </div>
        ) : undefined}

        <div className="shopping-sort-container">
          <p style={{ fontSize: 12, color: "#6a6a6a" }}>
            총{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {productList?.length}
            </span>{" "}
            개의 제품이 있습니다.
          </p>

          <select
            className="shopping-sort-select"
            onChange={handleChangeSort}
            defaultValue={sort}
          >
            <option value="new">신상품순</option>
            <option value="low">낮은가격순</option>
            <option value="high">높은가격순</option>
          </select>
        </div>

        <div className="shopping-main-container">{printProductList}</div>
      </Main>
      <Footer />
    </div>
  );
}
