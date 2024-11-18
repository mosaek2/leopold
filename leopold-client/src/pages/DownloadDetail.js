import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import WhiteHeader from "../components/WhiteHeader";
import "./DownloadDetail.css";

export default function DownloadDetail() {
  const [download, setDownload] = useState();

  const { uid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/download/${uid}`)
      .then((response) => {
        console.log(response.data);
        setDownload(response.data);
      })
      .catch((error) => alert(error.response.data));
  }, [uid]);

  const handleClickPrev = (e) => {
    navigate(``);
  };

  const handleClickNext = (e) => {
    navigate(``);
  };

  return (
    <>
      <WhiteHeader />
      <Main>
        <div id="downloadDetail-container">
          {/* 메뉴 바 */}
          <div className="downloadDetail-comm_title">
            <ul className="downloadDetail-tab">
              <li className="downloadDetail-on">
                <Link to="/notices">
                  <div className="downloadDetail-img">
                    <img src="\images\Download\cs_notice.svg" alt="확성기" />
                  </div>
                  <br />
                  <div className="downloadDetail-txt">공지사항</div>
                </Link>
              </li>
              <li className="downloadDetail-on">
                <Link to="/downloads">
                  <div className="downloadDetail-img">
                    <img src="\images\Download\cs_data_on.svg" alt="구름" />
                  </div>
                  <br />
                  <div className="downloadDetail-txt">자료실</div>
                </Link>
              </li>
              <li className="downloadDetail-on">
                <Link to="/faq">
                  <div className="downloadDetail-img">
                    <img src="\images\Notice\cs_faq.svg" alt="보고서" />
                  </div>
                  <br />
                  <div className="downloadDetail-txt">FAQ</div>
                </Link>
              </li>
              <li className="downloadDetail-on">
                <Link to="/as">
                  <div className="downloadDetail-img">
                    <img src="\images\Notice\cs_as.svg" alt="스패너" />
                  </div>
                  <br />
                  <div className="downloadDetail-txt">A/S 접수</div>
                </Link>
              </li>
              <li className="downloadDetail-on">
                <Link to="/review">
                  <div className="downloadDetail-img">
                    <img src="\images\Notice\cs_review.svg" alt="말풍선" />
                  </div>
                  <br />
                  <div className="downloadDetail-txt">사용자 리뷰</div>
                </Link>
              </li>
            </ul>
          </div>
          {/* 제목 */}
          <div className="downloadDetail-titleArea">
            <h2>자료실</h2>
            <p>Download</p>
          </div>
          {/* 게시판 */}
          <div className="downloadDetail-board">
            <div className="downloadDetail-base-table">
              <table>
                <tbody>
                  <tr className="downloadDetail-bd_title">
                    <td>
                      <div className="downloadDetail-t01">
                        {download?.title}
                      </div>
                      <div className="downloadDetail-t02">
                        <span>{"Leopold"}</span>
                        <span>{download?.writeDate}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="downloadDetail-bd_content">
                    <td>
                      <div className="downloadDetail-fr-view">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: download?.content,
                          }}
                        />
                        <p>
                          <br />
                        </p>
                        <p>
                          {/* <Link
                            to={"https://www.realforce.co.jp/support/download/"}
                          >
                            {"https://www.realforce.co.jp/support/download/"}
                          </Link> */}
                        </p>
                        <p>
                          <br />
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* 목록 버튼 */}
            <div className="downloadDetail-base-button">
              <span>
                <Link to={"/downloads"}>목록</Link>
              </span>
            </div>
          </div>
          {/* 이전글/다음글 */}
          <div className="downloadDetail-board-movement">
            <ul>
              <li className="downloadDetail-prev">
                <strong>이전글</strong>
                {"FC730MBT MX2A Manual"}
              </li>
              <li className="downloadDetail-next">
                <strong>다음글</strong>
                {"FC630MBT MX2A Manual"}
              </li>
            </ul>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
