import axios from "axios";
import "froala-editor/js/plugins/align.min.js";
import { useCallback, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./WriteOne2one.css";
import "./WriteReview.css";

export default function WriteOne2one() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");

  const writeText = useCallback((e) => {
    setEmail2(e.target.value);
  }, []);

  const handleSubmit = async (e) => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if (content === "") {
      alert("내용을 입력해주세요.");
      return;
    } else if (email1 === "") {
      alert("이메일을 입력해 주세요.");
      return;
    }

    let emailDomain;
    if (email2 === "type") emailDomain = email3;
    else emailDomain = email2;

    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/one2one/write`,
        {
          title: `${title}`,
          content: `${content}`,
          email: `${email1}@${emailDomain}`,
        },
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        navigate("/one2one");
        alert("작성 완료!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.status === 401 && alert("로그인이 필요합니다.");
      }
    }
  };

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
                <p style={{ color: "black" }}></p>
              </div>
            </div>
          </div>
        </div>
        {/* 글작성 */}
        <form className="write-one2one-container">
          <div className="write-title-container">
            <p style={{ fontSize: "15px", width: "58px" }}>제목</p>
            <textarea
              className="write-title-box"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="write-email-container">
            <div className="email-top-container">
              <p className="email-title">이메일</p>
              <textarea
                className="email-text-box"
                onChange={(e) => {
                  setEmail1(e.target.value);
                }}
              ></textarea>
              <p style={{ color: "#9d9d9d", padding: "5px" }}>@</p>
              {email2 === "type" ? (
                <input
                  className="email-text-box"
                  onChange={(e) => {
                    setEmail3(e.target.value);
                  }}
                ></input>
              ) : undefined}

              {email2 !== "type" ? (
                <input
                  value={email2}
                  type="text"
                  className="email-text-box"
                  onChange={writeText}
                ></input>
              ) : undefined}
              <select
                class="box"
                className="select-box"
                onChange={(e) => {
                  setEmail2(e.target.value);
                }}
              >
                <option value="type">직접 입력</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="nate.com">nate.com</option>
              </select>
            </div>
            <div className="q-check-container">
              <p className="q-email">답변 여부를 메일로 받으시겠습니까?</p>
              <div className="q-check">
                <input type="radio" name="check" id="yes"></input>
                <label for="yes">예</label>

                <input type="radio" name="check" id="no"></input>
                <label for="no">아니오</label>
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "10px" }}
            className="write-content-container"
          >
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

          <div className="catalog-container">
            <button
              className="catalog-box2"
              onClick={() => {
                navigate("/one2one");
              }}
            >
              목록
            </button>

            <div className="cancle-container">
              <button
                type="button"
                className="register-box"
                onClick={handleSubmit}
              >
                등록
              </button>
              <button
                className="catalog-box2"
                onClick={() => {
                  navigate("/one2one");
                }}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </Main>
      <Footer />
    </>
  );
}
