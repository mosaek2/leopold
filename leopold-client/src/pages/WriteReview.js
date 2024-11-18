import axios from "axios";
import "froala-editor/js/plugins/align.min.js";
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./WriteReview.css";

export default function WriteReview() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review/write`,
        {
          title: `${title}`,
          content: `${content}`,
        },
        {
          withCredentials: true,
        },
      )
      .then((resp) => {
        navigate(`/review`);
        alert("작성 완료!");
      })
      .catch((e) => {
        alert("로그인이 필요합니다!");
      });
  };

  return (
    <>
      <WhiteHeader />
      <Main>
        {/* 메뉴 바 */}
        <div className="review-comm_title">
          <ul className="review-tab">
            <li className="review-on">
              <Link to="/notice">
                <div className="review-img">
                  <img src="\images\Download\cs_notice.svg" alt="확성기" />
                </div>
                <br />
                <div className="review-txt">공지사항</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/download">
                <div className="review-img">
                  <img src="\images\Notice\cs_download.svg" alt="구름" />
                </div>
                <br />
                <div className="review-txt">자료실</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/faq">
                <div className="review-img">
                  <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                </div>
                <br />
                <div className="review-txt">FAQ</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/as">
                <div className="review-img">
                  <img src="\images\Notice\cs_as.svg" alt="스패너" />
                </div>
                <br />
                <div className="review-txt">A/S 접수</div>
              </Link>
            </li>
            <li className="review-on">
              <Link to="/review">
                <div className="review-img">
                  <img src="\images\Review\cs_review_on.svg" alt="말풍선" />
                </div>
                <br />
                <div className="review-txt">사용자 리뷰</div>
              </Link>
            </li>
          </ul>
        </div>
        {/* 제목 */}
        <div className="review-titleArea">
          <h2>사용자 리뷰</h2>
          <p>User review</p>
        </div>
        {/* 글작성 */}
        <div className="write-container">
          <div className="write-title-container">
            <p style={{ fontSize: "15px", width: "58px" }}>제목</p>
            <textarea
              className="write-title-box"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="write-content-container">
            <FroalaEditor
              tag="textarea"
              model={content}
              onModelChange={(model) => {
                setContent(model);
              }}
              config={{
                heightMin: 450, //최소 높이
                autoGrow: false, //높이 자동 조절 비활성화
              }}
            />
          </div>
          <div className="ucc-container">
            <p style={{ fontSize: "14px" }}>UCC URL</p>
            <textarea className="ucc-box"></textarea>
          </div>
          <div className="guide-container">
            <p style={{ paddingBottom: "5px" }}>
              · 상품과 관련없는 내용 또는 이미지, 욕설/비방, 개인정보유출,
              광고/홍보글 등 적절하지 않은 게시물은 별도의 고지없이 비공개 처리
              될 수 있습니다.
            </p>
            <p>
              · 작성된 게시물(사진, 동영상 포함)은 운영 및 마케팅에 활용될 수
              있습니다.
            </p>
          </div>
          <div className="catalog-container">
            <Link to="/review">
              <button className="catalog-box2">목록</button>
            </Link>
            <div className="cancle-container">
              <button className="register-box" onClick={handleSubmit}>
                등록
              </button>
              <button
                className="catalog-box2"
                onClick={() => {
                  navigate(`/review`);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
