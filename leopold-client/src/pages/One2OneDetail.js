import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./One2OneDetail.css";
import "./ReviewDetail.css";

export default function One2OneDetail() {
  const [one2One, setOne2One] = useState({
    title: "",
    name: "",
    writeDate: "",
    content: "",
    answerYn: "",
    answer: "",
    answerDate: "",
    deleteYn: "",
  });

  const { uid } = useParams();

  const navigate = useNavigate();

  // 문의 조회
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/one2one/${uid}`)
      .then((res) => {
        setOne2One(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 문의 삭제
  const handleDelete = () => {
    if (window.confirm("해당 글을 삭제하시겠습니까?") === true) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/one2one/delete/${uid}`, {
          data: {
            deleteYn: "y",
          },
          withCredentials: true,
        })
        .then((resp) => {
          alert("삭제 완료!");
          navigate(`/one2one`);
        })
        .catch((e) => {
          alert("본인이 작성한 글만 삭제할 수 있습니다.");
        });
    } else {
      alert("취소되었습니다.");
      return false;
    }
  };

  // 시간 설정
  const date = new Date(one2One?.writeDate);
  const year = date?.getFullYear();
  const month = String(date.getMonth() + 1)?.padStart(2, "0");
  const day = String(date.getDate())?.padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const date2 = new Date(one2One?.answerDate);
  const year2 = date2?.getFullYear();
  const month2 = String(date2.getMonth() + 1)?.padStart(2, "0");
  const day2 = String(date2.getDate())?.padStart(2, "0");
  const hours2 = String(date2.getHours()).padStart(2, "0");
  const minutes2 = String(date2.getMinutes()).padStart(2, "0");
  const seconds2 = String(date2.getSeconds()).padStart(2, "0");

  const length = one2One?.name?.length;
  let name = one2One?.name;

  if (length === 2) {
    name = name[0] + "*" + name[1];
  } else if (length === 3) {
    name = name[0] + "*" + name[2];
  } else if (length >= 4) {
    name = name[0] + "*" + name.slice(-1);
  }

  return (
    <>
      <WhiteHeader />
      <Main>
        <div id="one2one-container">
          <div id="one2one-contents">
            <div className="one2one-board-listPackage">
              {/* 제목 */}
              <div className="one2one-board-title">
                <h2>
                  <font>1:1문의</font>
                </h2>
                <p>Q&A</p>
              </div>
            </div>
          </div>
        </div>
        {/* 질문 */}
        <div className="qna-container">
          <div className="q-container">
            <div className="qa-box">
              <p className="qa-bold-text">제목</p>
              <p className="qa-light-text">{one2One.title}</p>
            </div>
            <div className="qa-box">
              <p className="qa-bold-text">작성자</p>
              <p style={{ width: "540px" }} className="qa-light-text">
                {name}
              </p>
              <p className="qa-bold-text">답변여부</p>
              <p className="qa-light-text">
                {one2One.answerYn === "y" ? "O" : "X"}
              </p>
            </div>
            <div className="qa-box">
              <p className="qa-bold-text">문의일시</p>
              <p className="qa-light-text">
                {year}.{month}.{day} {hours}:{minutes}:{seconds}
              </p>
            </div>
            <p
              style={{ lineHeight: "108px", paddingLeft: "50px" }}
              className="qa-light-text"
              dangerouslySetInnerHTML={{ __html: one2One.content }}
            ></p>
          </div>
          {/* 답변 */}
          {one2One.answerYn === "y" ? (
            <div className="a-container">
              <div className="qa-box">
                <p className="qa-bold-text">답변자</p>
                <p className="qa-light-text">운영자</p>
              </div>
              <div className="qa-box">
                <p className="qa-bold-text">답변일시</p>
                <p className="qa-light-text">
                  {year2}.{month2}.{day2} {hours2}:{minutes2}:{seconds2}
                </p>
              </div>
              <div className="a-box">
                <p
                  className="a-light-text"
                  dangerouslySetInnerHTML={{ __html: one2One.answer }}
                ></p>
              </div>
              <div
                style={{ marginTop: "115px" }}
                className="review-catalog-container"
              >
                <Link to="/one2one">
                  <button className="catalog-box">목록</button>
                </Link>
                <button className="one2one-catalog-box" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div className="a-container">
              <div className="qa-box">
                <p className="qa-bold-text">답변자</p>
                <p className="qa-light-text"></p>
              </div>
              <div className="qa-box">
                <p className="qa-bold-text">답변일시</p>
                <p className="qa-light-text"></p>
              </div>
              <div className="a-box">
                <p
                  className="a-light-text"
                  dangerouslySetInnerHTML={{ __html: one2One.answer }}
                ></p>
              </div>
              <div
                style={{ marginTop: "115px" }}
                className="review-catalog-container"
              >
                <Link to="/one2one">
                  <button className="catalog-box">목록</button>
                </Link>
                <button className="one2one-catalog-box" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      </Main>
      <Footer />
    </>
  );
}
